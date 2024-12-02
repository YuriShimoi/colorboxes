const TUTORIAL_LEVEL_LIST = [
    new Table(1, 5, Table.mapFromObject({ // BOXES
        '0-0': Box.GREEN
    }), { // SOLUTION
        '0-4': Box.GREEN
    }),
    new Table(1, 5, Table.mapFromObject({ // BOXES
        '0-0': Box.GREEN,
        '0-2': Box.BLUE
    }), { // SOLUTION
        '0-3': Box.GREEN,
        '0-4': Box.BLUE
    })
];

const LEVEL_LIST = [
    new Table(10, 10, Table.mapFromObject({ // BOXES
        '1-6': Box.BLUE,
        '3-2': Box.BLUE,
        '2-5': Box.GREEN,
        '6-6': Box.GREEN
    }), { // SOLUTION
        '6-2': Box.BLUE,
        '6-6': Box.BLUE,
        '2-2': Box.GREEN,
        '6-3': Box.GREEN
    })
];