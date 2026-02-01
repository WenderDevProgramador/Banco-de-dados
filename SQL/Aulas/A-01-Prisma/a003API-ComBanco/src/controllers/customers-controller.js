const Customer = require("../models/Customer");

const customersController = {

    // GET /customers

    index: async (req, res) => {
        const customers = await Customer.findAll();
        res.json(customers);
    },

    // POST /customers

    create: async (req, res) => {
        const { name, email } = req.body;
        const newCustomer = await Customer.create({ name, email });
        res.status(201).json(newCustomer);
    },

    //GET /customers/:id

    show: async (req, res) => {
        const { id } = req.params;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }
        res.json(customer);
    },

    // PUT /customers/:id

    update: async (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;

        const updatedCustomer = await Customer.update(id, { name, email });

        if (!updatedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.json(updatedCustomer);
    },

    // DELETE /customers/:id
    delete: async (req, res) => {
        const { id } = req.params;
        const deletedCustomer = await Customer.delete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        res.json(deletedCustomer);
    }
}

module.exports = customersController;