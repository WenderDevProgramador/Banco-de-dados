const { query } = require("./pool");

async function createEvent(name, eventDate, totalTickets) {
    if (typeof totalTickets === 'number' && totalTickets > 0) {
        await query(`
            INSERT INTO events (name, event_date, total_tickets)
            VALUES ($1, $2, $3)
        `, [name, eventDate, totalTickets]);
        console.log(`Event '${name}' created successfully.`);
    } else {
        throw new Error("Total tickets mus be greater than 0.")
    }

    console.log("Event created successfully.");
}

async function getAllEvents() {
    const result = await query(`SELECT id, name, 
        event_date as "eventDate",
        total_tickets as "totalTickets",
        tickets_sold as "ticketsSold"
        FROM events`);
    return result.rows;
}

async function getEventByName(name) {
    const result = await query(`SELECT id, name, 
        event_date as "eventDate",
        total_tickets as "totalTickets",
        tickets_sold as "ticketsSold"
        FROM events
        WHERE name = $1`, [name]);
    return result.rows;
}

async function getEventByDate(eventDate) {
    const result = await query(`SELECT id, name, 
        event_date as "eventDate",
        total_tickets as "totalTickets",
        tickets_sold as "ticketsSold"
        FROM events
        WHERE event_date = $1`, [eventDate]);
    return result.rows;
}

async function sellTicket(eventId) {
    const { rows } = await query(
        `SELECT
      id,
      event_date AS "eventDate",
      total_tickets AS "totalTickets",
      tickets_sold AS "ticketsSold"
    FROM events
    WHERE id = $1;`,
        [eventId]
    );

    const event = rows[0];

    if (!event) {
        throw new Error(`Evento com id ${eventId} não encontrado.`);
    }

    const now = new Date();
    const eventDate = new Date(event.eventDate);

    if (eventDate > now && event.ticketsSold < event.totalTickets) {
        await query(
            `UPDATE events
       SET tickets_sold = tickets_sold + 1
       WHERE id = $1;`,
            [eventId]
        );
        console.log(`Ingresso vendido para o evento ${eventId}.`);
    } else {
        throw new Error("Cannot sell ticket: Event has passed or no tickets available.");
    }
}


module.exports = {
    createEvent,
    getAllEvents,
    getEventByName,
    getEventByDate,
    sellTicket
}