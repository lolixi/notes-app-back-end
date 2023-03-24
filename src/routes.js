const {
  addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHanlder,
  editNoteByIdHanlder,
  deleteNoteByHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteHandler,
  },
  // Menggunakan fungsi getNoteByIdHanlder ke konfigurasi route untuk menampilkan note
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHanlder,
  },
  // Konfigurasi route untuk memakai method put untuk mengubah isi note
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHanlder,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByHandler,
  },
];

module.exports = routes;
