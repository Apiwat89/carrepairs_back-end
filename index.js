const express = require('express')
const Sequelize = require('sequelize')
const app = express()

app.use(express.json())

const sequelize = new Sequelize('database','username','password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/SQBooks.sqlite'
})

const customer = sequelize.define('customer', {
    customerID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phonenumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    carcode: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const sparepart = sequelize.define('sparepart', {
    spareID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    supplierID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const supplier = sequelize.define('supplier', {
    supplierID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phonenumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const repair = sequelize.define('repair', {
    repairID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    spareID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mechanicName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

sequelize.sync()

// Get all customers
app.get('/customers', (req, res) => {
    customer.findAll()
        .then(customers => {
            res.json(customers);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Get a specific customer by ID
app.get('/customers/:id', (req, res) => {
    customer.findByPk(req.params.id)
        .then(customer => {
            if (!customer) {
                res.status(404).send('Customer not found');
            } else {
                res.json(customer);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Create a new customer
app.post('/customers', (req, res) => {
    customer.create(req.body)
        .then(customer => {
            res.send(customer);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Update a customer by ID
app.put('/customers/:id', (req, res) => {
    customer.findByPk(req.params.id)
        .then(customer => {
            if (!customer) {
                res.status(404).send('Customer not found');
            } else {
                customer.update(req.body)
                    .then(() => {
                        res.send(customer);
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Delete a customer by ID
app.delete('/customers/:id', (req, res) => {
    customer.findByPk(req.params.id)
        .then(customer => {
            if (!customer) {
                res.status(404).send('Customer not found');
            } else {
                customer.destroy()
                    .then(() => {
                        res.send({});
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

customer.hasMany(repair, {
    foreignKey: 'customerID',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Delete related records if supplier is deleted
    hooks: true // Enable hooks for cascade delete
});

// Get all spare parts
app.get('/spareparts', (req, res) => {
    sparepart.findAll()
        .then(spareparts => {
            res.json(spareparts);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Get a specific spare part by ID
app.get('/spareparts/:id', (req, res) => {
    sparepart.findByPk(req.params.id)
        .then(sparepart => {
            if (!sparepart) {
                res.status(404).send('Spare part not found');
            } else {
                res.json(sparepart);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Create a new spare part
app.post('/spareparts', (req, res) => {
    sparepart.create(req.body)
        .then(sparepart => {
            res.send(sparepart);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Update a spare part by ID
app.put('/spareparts/:id', (req, res) => {
    sparepart.findByPk(req.params.id)
        .then(sparepart => {
            if (!sparepart) {
                res.status(404).send('Spare part not found');
            } else {
                sparepart.update(req.body)
                    .then(() => {
                        res.send(sparepart);
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Delete a spare part by ID
app.delete('/spareparts/:id', (req, res) => {
    sparepart.findByPk(req.params.id)
        .then(sparepart => {
            if (!sparepart) {
                res.status(404).send('Spare part not found');
            } else {
                sparepart.destroy()
                    .then(() => {
                        res.send({});
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

sparepart.hasMany(repair, {
    foreignKey: 'spareID',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Delete related records if supplier is deleted
    hooks: true // Enable hooks for cascade delete
});

// Get all suppliers
app.get('/suppliers', (req, res) => {
    supplier.findAll()
        .then(suppliers => {
            res.json(suppliers);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Get a specific supplier by ID
app.get('/suppliers/:id', (req, res) => {
    supplier.findByPk(req.params.id)
        .then(supplier => {
            if (!supplier) {
                res.status(404).send('Supplier not found');
            } else {
                res.json(supplier);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Create a new supplier
app.post('/suppliers', (req, res) => {
    supplier.create(req.body)
        .then(supplier => {
            res.send(supplier);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Update a supplier by ID
app.put('/suppliers/:id', (req, res) => {
    supplier.findByPk(req.params.id)
        .then(supplier => {
            if (!supplier) {
                res.status(404).send('Supplier not found');
            } else {
                supplier.update(req.body)
                    .then(() => {
                        res.send(supplier);
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Delete a supplier by ID
app.delete('/suppliers/:id', (req, res) => {
    supplier.findByPk(req.params.id)
        .then(supplier => {
            if (!supplier) {
                res.status(404).send('Supplier not found');
            } else {
                supplier.destroy()
                    .then(() => {
                        res.send({});
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

supplier.hasMany(sparepart, {
    foreignKey: 'supplierID',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE', // Delete related records if supplier is deleted
    hooks: true // Enable hooks for cascade delete
});

// Get all repairs
app.get('/repairs', (req, res) => {
    repair.findAll()
        .then(repairs => {
            res.json(repairs);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Get a specific repair by ID
app.get('/repairs/:id', (req, res) => {
    repair.findByPk(req.params.id)
        .then(repair => {
            if (!repair) {
                res.status(404).send('Repair not found');
            } else {
                res.json(repair);
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Create a new repair
app.post('/repairs', (req, res) => {
    repair.create(req.body)
        .then(repair => {
            res.send(repair);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});
// const repair = sequelize.define('repair', {
//     repairID: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     customerID: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     spareID: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     totalPrice: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     mechanicName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// Update a repair by ID
app.put('/repairs/:id', (req, res) => {
    repair.findByPk(req.params.id)
        .then(repair => {
            if (!repair) {
                res.status(404).send('Repair not found');
            } else {
                repair.update(req.body)
                    .then(() => {
                        res.send(repair);
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Delete a repair by ID
app.delete('/repairs/:id', (req, res) => {
    repair.findByPk(req.params.id)
        .then(repair => {
            if (!repair) {
                res.status(404).send('Repair not found');
            } else {
                repair.destroy()
                    .then(() => {
                        res.send({});
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://localhost:${port}`))