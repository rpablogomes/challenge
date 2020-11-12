const db = require("../../config/db");

module.exports = {
  index(callback) {
    db.query(
      `
            SELECT recipes.id, recipes.image, recipes.title, chefs.name as chefs_name
                
            FROM recipes
            
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            
            ORDER BY recipes.id ASC
        `,
      (error, results) => {
        if (error) throw "Database error!";
        callback(results.rows);
      }
    );
  },
  recipes(filter, callback) {

    db.query(
      `
      SELECT recipes.id, recipes.image, recipes.title, chefs.name as chefs_name
          
      FROM recipes
      
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      
      WHERE title ILIKE '%${filter}%'
      
      ORDER BY recipes.id ASC
  `,
      (error, results) => {
        if (error) throw "Database Error!!!";

        callback(results.rows);
      }
    );
  }, 
  recipe(id, callback) {

    db.query(
      `
    SELECT *
                
    FROM recipes
            
    LEFT JOIN chefs ON (recipes.chef_id = chefs.id)

    WHERE recipes.id = ${id}

    ORDER BY recipes.id ASC`,
      (err, results) => {
        if(err) throw "Database"
        callback(results.rows[0]);
      }
    );
  },
  chefs(callback) {
    query = `SELECT chefs.id, chefs.name, chefs.avatar_url, COUNT(chef_id) AS total_recipes

    FROM chefs

    LEFT JOIN recipes ON (chefs.id = recipes.chef_id)

    GROUP BY chefs.id, chefs.name, chefs.avatar_url`;

    db.query(query, function (err, results) {
      if (err) throw "Database";
      callback(results.rows);
    });
  }
};