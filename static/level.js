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
    new Table(3, 5, Table.mapFromObject({ // BOXES
        '0-0': Box.GREEN,
        '0-3': Box.GREEN
    }), { // SOLUTION
        '2-1': Box.GREEN,
        '2-3': Box.GREEN
    }),
    new Table(3, 5, Table.mapFromObject({ // BOXES
        '0-0': Box.GREEN,
        '1-0': Box.GREEN,
        '0-4': Box.BLUE
    }), { // SOLUTION
        '2-1': Box.GREEN,
        '2-3': Box.GREEN,
        '1-2': Box.BLUE
    }),
    new Table(3, 5, Table.mapFromObject({ // BOXES
        '0-1': Box.BLUE,
        '0-3': Box.BLUE,
        '1-1': Box.WALL,
        '1-2': Box.WALL,
        '1-3': Box.WALL
    }), { // SOLUTION
        '2-1': Box.BLUE,
        '2-3': Box.BLUE
    }),
    new Table(5, 5, Table.mapFromObject({ // BOXES
        '0-2': Box.RED,
        '4-2': Box.RED,
        '1-3': Box.WALL,
        '3-1': Box.WALL
    }), { // SOLUTION
        '1-1': Box.RED,
        '3-3': Box.RED
    }),
    new Table(5, 5, Table.mapFromObject({ // BOXES
        '1-1': Box.GREEN,
        '1-3': Box.GREEN,
        '3-2': Box.GREEN,
        '2-1': Box.WALL,
        '2-3': Box.WALL
    }), { // SOLUTION
        '1-2': Box.GREEN,
        '3-1': Box.GREEN,
        '3-3': Box.GREEN
    }),
    new Table(5, 5, Table.mapFromObject({ // BOXES
        '0-2': Box.BLUE,
        '4-2': Box.BLUE,
        '2-0': Box.RED,
        '2-4': Box.RED
    }), { // SOLUTION
        '2-1': Box.BLUE,
        '2-3': Box.BLUE,
        '1-2': Box.RED,
        '3-2': Box.RED
    }),
    new Table(5, 5, Table.mapFromObject({ // BOXES
        '0-0': Box.YELLOW,
        '1-0': Box.YELLOW,
        '4-3': Box.GREEN,
        '4-4': Box.GREEN,
        '1-3': Box.WALL,
        '2-1': Box.WALL,
        '2-4': Box.WALL,
        '3-0': Box.WALL
    }), { // SOLUTION
        '3-3': Box.YELLOW,
        '4-2': Box.YELLOW,
        '0-1': Box.GREEN,
        '1-2': Box.GREEN
    }),
    new Table(5, 5, Table.mapFromObject({ // BOXES
        '0-4': Box.GREEN,
        '2-0': Box.GREEN,
        '4-4': Box.GREEN,
        '0-0': Box.BLUE,
        '2-4': Box.BLUE,
        '4-0': Box.BLUE
    }), { // SOLUTION
        '1-1': Box.GREEN,
        '1-3': Box.GREEN,
        '3-2': Box.GREEN,
        '2-1': Box.BLUE,
        '2-2': Box.BLUE,
        '2-3': Box.BLUE
    }),
    new Table(5, 5, Table.mapFromObject({ // BOXES
        '1-3': Box.GREEN,
        '3-1': Box.GREEN,
        '1-2': Box.BLUE,
        '3-2': Box.BLUE,
        '1-0': Box.RED,
        '3-4': Box.RED
    }), { // SOLUTION
        '1-1': Box.GREEN,
        '3-2': Box.GREEN,
        '2-1': Box.BLUE,
        '2-3': Box.BLUE,
        '1-2': Box.RED,
        '3-3': Box.RED
    }),
    new Table(7, 7, Table.mapFromObject({ // BOXES
        '0-3': Box.GREEN,
        '0-6': Box.GREEN,
        '6-0': Box.GREEN,
        '6-3': Box.GREEN,
        '0-0': Box.BLUE,
        '6-6': Box.BLUE,
        '3-0': Box.RED,
        '3-6': Box.RED
    }), { // SOLUTION
        '2-3': Box.GREEN,
        '2-4': Box.GREEN,
        '4-2': Box.GREEN,
        '4-4': Box.GREEN,
        '2-2': Box.BLUE,
        '4-3': Box.BLUE,
        '3-2': Box.RED,
        '3-4': Box.RED
    }),
    new Table(7, 7, Table.mapFromObject({ // BOXES
        '1-1': Box.WALL,
        '2-2': Box.WALL,
        '4-4': Box.WALL,
        '5-5': Box.WALL,
        '1-2': Box.RED,
        '2-1': Box.RED,
        '4-5': Box.RED,
        '5-4': Box.RED,
        '1-5': Box.YELLOW,
        '2-3': Box.YELLOW,
        '3-4': Box.YELLOW,
        '3-2': Box.BLUE,
        '4-3': Box.BLUE,
        '5-1': Box.BLUE
    }), { // SOLUTION
        '1-3': Box.RED,
        '3-1': Box.RED,
        '3-5': Box.RED,
        '5-3': Box.RED,
        '0-6': Box.YELLOW,
        '1-5': Box.YELLOW,
        '2-4': Box.YELLOW,
        '4-2': Box.BLUE,
        '5-1': Box.BLUE,
        '6-0': Box.BLUE
    }),
    new Table(7, 7, Table.mapFromObject({ // BOXES
        '1-1': Box.WALL,
        '1-4': Box.WALL,
        '1-5': Box.WALL,
        '5-1': Box.WALL,
        '5-2': Box.WALL,
        '5-5': Box.WALL,
        '1-0': Box.YELLOW,
        '1-6': Box.YELLOW,
        '5-0': Box.YELLOW,
        '5-6': Box.YELLOW,
        '2-4': Box.BLUE,
        '4-2': Box.BLUE,
        '0-5': Box.RED,
        '6-1': Box.RED
    }), { // SOLUTION
        '1-2': Box.YELLOW,
        '1-3': Box.YELLOW,
        '5-3': Box.YELLOW,
        '5-4': Box.YELLOW,
        '0-1': Box.BLUE,
        '6-5': Box.BLUE,
        '1-6': Box.RED,
        '5-0': Box.RED
    }),
    new Table(9, 9, Table.mapFromObject({ // BOXES
        '2-6': Box.WALL,
        '5-3': Box.WALL,
        '6-3': Box.WALL,
        '6-8': Box.WALL,
        '7-7': Box.WALL,
        '1-0': Box.GREEN,
        '2-5': Box.GREEN,
        '4-1': Box.GREEN,
        '7-3': Box.GREEN,
        '0-2': Box.BLUE,
        '5-4': Box.BLUE,
        '5-6': Box.BLUE,
        '8-0': Box.BLUE,
        '1-5': Box.YELLOW,
        '2-1': Box.YELLOW,
        '2-7': Box.YELLOW,
        '5-2': Box.YELLOW,
        '8-6': Box.YELLOW,
        '3-3': Box.RED,
        '4-5': Box.RED,
        '4-7': Box.RED,
        '7-1': Box.RED
    }), { // SOLUTION
        '2-3': Box.GREEN,
        '3-3': Box.GREEN,
        '3-7': Box.GREEN,
        '6-7': Box.GREEN,
        '5-1': Box.BLUE,
        '5-2': Box.BLUE,
        '6-1': Box.BLUE,
        '6-2': Box.BLUE,
        '1-6': Box.YELLOW,
        '1-7': Box.YELLOW,
        '2-7': Box.YELLOW,
        '5-4': Box.YELLOW,
        '8-7': Box.YELLOW,
        '4-3': Box.RED,
        '6-4': Box.RED,
        '7-3': Box.RED,
        '7-4': Box.RED
    }),
];