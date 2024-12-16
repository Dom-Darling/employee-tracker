//GET ENDPOINT

app.get('/api/employees', async (req, res) => {
    const employees = await db.query('SELECT * FROM employees');
    res.json(employees.rows);
  });
  

  //POST ENDPOINT
    app.post('/api/employees', async (req, res) => {
        const { name, job_title, salary } = req.body;
        const newEmployee = await db.query(
        'INSERT INTO employees (name, job_title, salary) VALUES ($1, $2, $3) RETURNING *',
        [name, job_title, salary]
        );
        res.json(newEmployee.rows[0]);
    });
  