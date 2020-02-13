module.exports = {
  selectById: (db, id) => `SELECT * FROM ${db} WHERE id = ${id}`,
  deleteById: (db, id) => `DELETE FROM ${db} WHERE id = ${id}`,
}