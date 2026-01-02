require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

io.on('connection', (socket) => {
  console.log('Có người dùng kết nối:', socket.id);

  // Khi người dùng vào một phòng chat cụ thể
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} đã vào phòng: ${roomId}`);
  });

  socket.on('send_message', async (data) => {
    const { room_id, sender_id, text_content, file_url, message_type } = data;

    const { data: savedMessage, error } = await supabase
      .from('messages')
      .insert([
        { room_id, sender_id, text_content, file_url, message_type }
      ])
      .select('*')
      .single();

    if (error) {
      console.error('Lỗi lưu tin nhắn:', error);
      return;
    }


    io.to(room_id).emit('receive_message', savedMessage);
  });

  socket.on('disconnect', () => {
    console.log('Người dùng đã ngắt kết nối');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server đang chạy tại port ${PORT}`);
});