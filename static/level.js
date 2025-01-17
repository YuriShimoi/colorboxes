const MODIFIER = {
    'MULTIPLE': 'm',
    'PORTAL': 'p'
};

const TUTORIAL_LEVEL_LIST = [
    {
        'table': new Table(1, 5, Table.mapFromObject({ // BOXES
            '0-0': Box.GREEN
        }), { // SOLUTION
            '0-4': Box.GREEN
        })
    },
    {
        'table': new Table(1, 5, Table.mapFromObject({ // BOXES
            '0-0': Box.GREEN,
            '0-2': Box.BLUE
        }), { // SOLUTION
            '0-3': Box.GREEN,
            '0-4': Box.BLUE
        })
    }
];

const LEVEL_LIST = [
    // #region [SIMPLE LEVELS]
    {
        'table': new Table(3, 5, Table.mapFromObject({ // BOXES
            '0-0': Box.GREEN,
            '0-3': Box.GREEN
        }), { // SOLUTION
            '2-1': Box.GREEN,
            '2-3': Box.GREEN
        })
    },
    {
        'table': new Table(3, 5, Table.mapFromObject({ // BOXES
            '0-0': Box.GREEN,
            '1-0': Box.GREEN,
            '0-4': Box.BLUE
        }), { // SOLUTION
            '2-1': Box.GREEN,
            '2-3': Box.GREEN,
            '1-2': Box.BLUE
        })
    },
    {
        'table': new Table(3, 5, Table.mapFromObject({ // BOXES
            '0-1': Box.BLUE,
            '0-3': Box.BLUE,
            '1-1': Box.WALL,
            '1-2': Box.WALL,
            '1-3': Box.WALL
        }), { // SOLUTION
            '2-1': Box.BLUE,
            '2-3': Box.BLUE
        })
    },
    {
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
            '0-2': Box.RED,
            '4-2': Box.RED,
            '1-3': Box.WALL,
            '3-1': Box.WALL
        }), { // SOLUTION
            '1-1': Box.RED,
            '3-3': Box.RED
        })
    },
    {
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
            '1-1': Box.GREEN,
            '1-3': Box.GREEN,
            '3-2': Box.GREEN,
            '2-1': Box.WALL,
            '2-3': Box.WALL
        }), { // SOLUTION
            '1-2': Box.GREEN,
            '3-1': Box.GREEN,
            '3-3': Box.GREEN
        })
    },
    {
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
            '0-2': Box.BLUE,
            '4-2': Box.BLUE,
            '2-0': Box.RED,
            '2-4': Box.RED
        }), { // SOLUTION
            '2-1': Box.BLUE,
            '2-3': Box.BLUE,
            '1-2': Box.RED,
            '3-2': Box.RED
        })
    },
    {
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
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
        })
    },
    {
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
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
        })
    },
    {
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
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
        })
    },
    {
        'table': new Table(7, 7, Table.mapFromObject({ // BOXES
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
        })
    },
    {
        'table': new Table(7, 7, Table.mapFromObject({ // BOXES
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
        })
    },
    {
        'table': new Table(7, 7, Table.mapFromObject({ // BOXES
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
        })
    },
    {
        'table': new Table(7, 7, Table.mapFromObject({ // BOXES
            '2-4': Box.WALL,
            '2-5': Box.WALL,
            '2-6': Box.WALL,
            '4-0': Box.WALL,
            '4-1': Box.WALL,
            '4-2': Box.WALL,
            '1-1': Box.BLUE,
            '1-5': Box.BLUE,
            '5-3': Box.BLUE,
            '1-3': Box.GREEN,
            '5-1': Box.GREEN,
            '5-5': Box.GREEN,
            '3-1': Box.RED,
            '3-5': Box.RED
        }), { // SOLUTION
            '1-5': Box.BLUE,
            '5-1': Box.BLUE,
            '5-5': Box.BLUE,
            '1-1': Box.GREEN,
            '5-6': Box.GREEN,
            '6-5': Box.GREEN,
            '0-1': Box.RED,
            '1-0': Box.RED
        })
    },
    {
        'table': new Table(9, 9, Table.mapFromObject({ // BOXES
            '1-1': Box.WALL,
            '1-2': Box.WALL,
            '1-7': Box.WALL,
            '7-1': Box.WALL,
            '7-6': Box.WALL,
            '7-7': Box.WALL,
            '1-3': Box.YELLOW,
            '1-6': Box.YELLOW,
            '7-2': Box.YELLOW,
            '7-5': Box.YELLOW,
            '2-4': Box.GREEN,
            '3-4': Box.GREEN,
            '5-4': Box.GREEN,
            '6-4': Box.GREEN,
            '3-1': Box.BLUE,
            '3-2': Box.BLUE,
            '5-1': Box.BLUE,
            '5-2': Box.BLUE,
            '2-6': Box.RED,
            '3-7': Box.RED,
            '5-7': Box.RED,
            '6-6': Box.RED
        }), { // SOLUTION
            '0-4': Box.YELLOW,
            '0-5': Box.YELLOW,
            '8-3': Box.YELLOW,
            '8-4': Box.YELLOW,
            '4-0': Box.GREEN,
            '4-1': Box.GREEN,
            '4-2': Box.GREEN,
            '4-3': Box.GREEN,
            '2-8': Box.BLUE,
            '4-7': Box.BLUE,
            '4-8': Box.BLUE,
            '6-8': Box.BLUE,
            '2-0': Box.RED,
            '2-1': Box.RED,
            '6-0': Box.RED,
            '6-1': Box.RED
        })
    },
    // #endregion
    // #region [MULTIPLE LEVELS]
    {
        'modifiers': [MODIFIER.MULTIPLE],
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
                '0-2': Box.RED,
                '2-0': Box.YELLOW,
                '2-2': Box.Multi(Box.RED, Box.GREEN, Box.BLUE, Box.YELLOW),
                '2-4': Box.GREEN,
                '4-2': Box.BLUE
            }), { // SOLUTION
                '2-2': Box.Multi(Box.RED, Box.GREEN, Box.BLUE, Box.YELLOW),
                '3-3': Box.YELLOW,
                '3-1': Box.GREEN,
                '1-1': Box.RED,
                '1-3': Box.BLUE
        })
    },
    {
        'modifiers': [MODIFIER.MULTIPLE],
        'table': new Table(3, 5, Table.mapFromObject({ // BOXES
            '1-1': Box.GREEN,
            '1-2': Box.Multi(Box.GREEN, Box.BLUE),
            '1-3': Box.BLUE
        }), { // SOLUTION
            '0-1': Box.GREEN,
            '1-2': Box.Multi(Box.GREEN, Box.BLUE),
            '2-3': Box.BLUE
        })
    },
    {
        'modifiers': [MODIFIER.MULTIPLE],
        'table': new Table(4, 5, Table.mapFromObject({ // BOXES
            '1-2': Box.Multi(Box.RED, Box.YELLOW),
            '2-4': Box.RED,
            '2-0': Box.YELLOW
        }), { // SOLUTION
            '1-2': Box.Multi(Box.RED, Box.YELLOW),
            '2-1': Box.RED,
            '2-3': Box.YELLOW
        })
    },
    {
        'modifiers': [MODIFIER.MULTIPLE],
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
                '0-2': Box.BLUE,
                '2-0': Box.BLUE,
                '2-2': Box.Multi(Box.BLUE, Box.YELLOW),
                '2-4': Box.YELLOW,
                '4-2': Box.YELLOW
            }), { // SOLUTION
                '0-0': Box.BLUE,
                '1-1': Box.BLUE,
                '2-2': Box.Multi(Box.BLUE, Box.YELLOW),
                '3-3': Box.YELLOW,
                '4-4': Box.YELLOW
        })
    },
    {
        'modifiers': [MODIFIER.MULTIPLE],
        'table': new Table(5, 5, Table.mapFromObject({ // BOXES
                '1-1': Box.RED,
                '1-2': Box.Multi(Box.GREEN, Box.RED),
                '1-3': Box.RED,
                '3-1': Box.GREEN,
                '3-2': Box.RED,
                '3-3': Box.GREEN
            }), { // SOLUTION
                '1-2': Box.RED,
                '2-3': Box.GREEN,
                '2-2': Box.Multi(Box.GREEN, Box.RED),
                '2-1': Box.GREEN,
                '3-3': Box.RED,
                '3-1': Box.RED
        })
    },
    {
        'modifiers': [MODIFIER.MULTIPLE],
        'table': new Table(5, 7, Table.mapFromObject({ // BOXES
                '0-3': Box.WALL,
                '1-0': Box.YELLOW,
                '1-4': Box.WALL,
                '1-6': Box.BLUE,
                '2-2': Box.BLUE,
                '2-3': Box.Multi(Box.BLUE, Box.YELLOW),
                '2-4': Box.YELLOW,
                '3-0': Box.YELLOW,
                '3-2': Box.WALL,
                '3-6': Box.BLUE,
                '4-3': Box.WALL
            }), { // SOLUTION
                '2-0': Box.BLUE,
                '1-1': Box.BLUE,
                '2-3': Box.Multi(Box.BLUE, Box.YELLOW),
                '4-4': Box.BLUE,
                '3-5': Box.YELLOW,
                '2-6': Box.YELLOW,
                '0-2': Box.YELLOW
        })
    },
    {
        'modifiers': [MODIFIER.MULTIPLE],
        'table': new Table(7, 7, Table.mapFromObject({ // BOXES
                '1-1': Box.RED,
                '1-5': Box.WALL,
                '2-2': Box.Multi(Box.RED, Box.GREEN),
                '3-3': Box.Multi(Box.RED, Box.BLUE),
                '4-1': Box.WALL,
                '5-2': Box.WALL,
                '5-5': Box.Multi(Box.RED, Box.YELLOW)
            }), { // SOLUTION
                '1-4': Box.Multi(Box.RED, Box.YELLOW),
                '2-5': Box.Multi(Box.RED, Box.BLUE),
                '5-1': Box.Multi(Box.RED, Box.GREEN),
                '2-4': Box.RED
        })
    },
    // #endregion
    // #region [PORTAL LEVELS]
    {
        'modifiers': [MODIFIER.PORTAL],
        'table': new Table(4, 4, Table.mapFromObject({ // BOXES
            '1-1': Box.GREEN,
            '2-2': Box.GREEN
        }), { // SOLUTION
            '0-0': Box.GREEN,
            '3-3': Box.GREEN
        }, [MODIFIER.PORTAL])
    },
    // #endregion
];