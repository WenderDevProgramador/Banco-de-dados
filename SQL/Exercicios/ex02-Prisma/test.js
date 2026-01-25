const { createEvent, getAllEvents, getEventByName, getEventByDate, sellTicket } = require('./functions');

async function test() {
    const result = await getAllEvents();

    console.log(result)

    await createEvent('Apresentação de Teatro', new Date('2026-01-25'), 300);

    await createEvent('Apresentação de Orquestra', new Date('2024-01-25'), 300);



    const result2 = await getEventByName('Concert A')
    console.log(result2)

    const result3 = await getEventByDate(new Date('2026-06-25'))
    console.log(result3)

    await sellTicket(19);
    await sellTicket(19);
    await sellTicket(19);
    await sellTicket(19);
    await sellTicket(19);
    await sellTicket(19);
    await sellTicket(19);
    await sellTicket(19);
    await sellTicket(19);
    await sellTicket(19);

    console.log(result)

    process.exit(0);
}

test()