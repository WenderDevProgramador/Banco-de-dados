import type { Handler } from "express";
import { prisma } from "../database/index.js";
import { CreateLeadRequestSchema, GetLeadsRequestSchema, UpdateLeadRequestSchema } from "./schemas/LeadsRequestSchema.js";
import { HttpError } from "../errors/HttpError.js";
import type { Prisma } from "../generated/prisma/client.js";
import { meta } from "zod/v4/core";

export class LeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const query = GetLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, scortBy = "name", order = "asc" } = query

            const pageNumber = Number(page)
            const pageSizeNumber = Number(pageSize)

            const where: Prisma.LeadWhereInput = {}

            if (name) where.name = { contains: name, mode: "insensitive" }
            if (status) where.status = status

            const leads = await prisma.lead.findMany(
                {
                    where,
                    skip: (pageNumber - 1) * pageSizeNumber,
                    take: pageSizeNumber,
                    orderBy: { [scortBy]: order }
                }
            )

            const total = await prisma.lead.count({ where })
            res.json({
                data: leads,
                meta: {
                    page: pageNumber,
                    pageSize: pageSizeNumber,
                    total,
                    totalPages: Math.ceil(total / pageSizeNumber)
                }
            })

        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body)
            if (!body) {
                return res.status(400).json({ error: "Invalid request body" })
            }

            const lead = await prisma.lead.create({
                data: body
            })

            res.status(201).json(lead)

        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const lead = await prisma.lead.findUnique({
                where: { id: Number(req.params.id) },
                include: {
                    groups: true,
                    campaigns: true
                }
            })

            if (!lead) {
                throw new HttpError(404, "Lead not found")
            }

            res.json(lead)

        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateLeadRequestSchema.parse(req.body)

            const leadExists = await prisma.lead.findUnique({
                where: { id: Number(req.params.id) }
            })

            if (!leadExists) {
                throw new HttpError(404, "Lead not found")
            }

            if (leadExists.status === "New" && body.status !== undefined && body.status !== "Contacted") {
                throw new HttpError(400, "Um novo lead deve ser contactado antes de mudar para outro status")
            }

            if (body.status && body.status === "Archived") {
                const now = new Date()
                const diffTime = Math.abs(now.getTime() - leadExists.updatedAt.getTime())
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                if (diffDays < 180) {
                    throw new HttpError(400, "Um lead arquivado deve ter pelo menos 180 dias de inatividade")
                }
            }

            const updatedLead = await prisma.lead.update({
                where: { id: Number(req.params.id) },
                data: body
            })
            res.json(updatedLead)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = Number(req.params.id)

            const leadExists = await prisma.lead.findUnique({ where: { id } })
            if (!leadExists) throw new HttpError(404, "lead não encontrado")

            const deletedLead = await prisma.lead.delete({ where: { id } })

            res.json({ deletedLead })
        } catch (error) {
            next(error)
        }
    }
}