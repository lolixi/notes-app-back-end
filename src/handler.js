const { nanoid } = require('nanoid');
const notes = require('./notes');

// Fungsi untuk menambahkan note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Fungsi untuk mendapatkan note
const getAllNoteHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByIdHanlder = (request, h) => {
  // Mendapatkan nilai id menggunakan request.params
  const { id } = request.params;

  // Memdapatkan objek note berdasarkan id dari objek array notes
  const note = notes.filter((n) => n.id === id)[0];

  // Memastikan bahwa objek note tidak bernilai undefined
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }
  // Jika nilai undefined maka fungsi respon gagal di bawah akan dijalankan
  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Funfsi editNoteByIdHanlder untuk membuat handler dalam mengubah isi note yang sudah dibuat
const editNoteByIdHanlder = (request, h) => {
  // Mendapatkan nilai id yang diubah pada route parameter
  const { id } = request.params;

  // Mendapatkan data notes terbaru yang dikirimkan oleh client
  const { title, tags, body } = request.payload;
  // Memperbarui nilai properti updateAt
  const updatedAt = new Date().toISOString();

  // Mendapatkan index array pada objek catatan sesuai id yang ditentukan
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteNoteByHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// Selalu export fungsi yang dibuat di dalam program agar bisa dipakai di luar file
module.exports = {
  addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHanlder,
  editNoteByIdHanlder,
  deleteNoteByHandler,
};
