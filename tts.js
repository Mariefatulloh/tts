const crosswordData = [
    { clue: "1. Mendatar: Sumber cahaya alamiah yang paling banyak digunakan pada siang hari", answer: "MATAHARI", row: 0, col: 0, direction: "across" },
    { clue: "2. Mendatar: Benda yang berfungsi sebagai alat bantu penglihatan untuk melihat objek kecil dengan jelas", answer: "KACA", row: 1, col: 0, direction: "across" },
    { clue: "3. Mendatar: Perangkat kecil yang digunakan untuk komunikasi jarak jauh dan memiliki tombol angka", answer: "PONSEL", row: 2, col: 1, direction: "across" },
    { clue: "4. Mendatar: Kata yang digunakan untuk menyebut ruang bawah tanah yang sering dianggap misterius", answer: "BUNKER", row: 3, col: 0, direction: "across" },
    { clue: "5. Mendatar: Peranti yang berguna untuk mengukur satuan waktu, seperti menit dan detik", answer: "JAM", row: 4, col: 0, direction: "across" },
    
    { clue: "1. Menurun: Lapisan yang sering ditemukan di permukaan air atau minuman, biasanya berupa cairan bening atau buih", answer: "BUSA", row: 0, col: 0, direction: "down" },
    { clue: "2. Menurun: Tempat menyimpan data digital yang sering kali bersifat pribadi dan rahasia", answer: "CLOUD", row: 0, col: 2, direction: "down" },
    { clue: "3. Menurun: Benda kecil yang dapat digunakan untuk membuka atau menutup gembok", answer: "KUNCI", row: 0, col: 3, direction: "down" },
    { clue: "4. Menurun: Kata yang menggambarkan sumber air alami yang biasanya ditemukan di pegunungan atau hutan", answer: "MATAAIR", row: 0, col: 4, direction: "down" },
    { clue: "5. Menurun: Tanaman yang banyak ditemui di hutan hujan dan dikenal karena daunnya yang lebar", answer: "PISANG", row: 2, col: 1, direction: "down" },
];

let score = 0;

function createCrosswordGrid() {
    const grid = document.getElementById('crossword-grid');
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');
    
    // Buat grid kosong berukuran 10x10
    grid.style.gridTemplateColumns = "repeat(10, 1fr)";
    grid.style.gridTemplateRows = "repeat(10, 1fr)";
    for (let i = 0; i < 10 * 10; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'black');
        grid.appendChild(cell);
    }

    // Isi grid dan petunjuk
    crosswordData.forEach((item, index) => {
        const { clue, answer, row, col, direction } = item;

        // Buat petunjuk
        const clueItem = document.createElement('li');
        clueItem.innerText = clue;
        (direction === "across" ? acrossClues : downClues).appendChild(clueItem);

        // Isi sel berdasarkan arah
        for (let i = 0; i < answer.length; i++) {
            const cellIndex = (row + (direction === "down" ? i : 0)) * 10 + (col + (direction === "across" ? i : 0));
            const cell = grid.children[cellIndex];
            cell.classList.remove('black');

            const input = document.createElement('input');
            input.maxLength = 1;
            input.dataset.answer = answer[i];
            input.dataset.index = index;

            // Tambahkan validasi input hanya huruf
            input.addEventListener('input', (event) => {
                const value = event.target.value.toUpperCase();
                event.target.value = /^[A-Z]$/.test(value) ? value : ""; // Batasi input ke huruf saja
                validateAnswer(event);
            });

            cell.appendChild(input);
        }
    });
}

function validateAnswer(event) {
    const input = event.target;
    const expectedAnswer = input.dataset.answer.toUpperCase();
    const playerAnswer = input.value.toUpperCase();

    if (playerAnswer === expectedAnswer) {
        input.classList.add('correct');
        input.disabled = true;  // Kunci input jika jawaban benar
        score += 10;            // Tambah skor
        updateScore();
    } else if (playerAnswer.length === 1) {
        // Jika jawaban salah dan panjang karakter sudah satu huruf, kosongkan nilai input
        alert("Jawaban salah, coba lagi!");
        input.value = "";
    }
}

function updateScore() {
    document.getElementById('score').innerText = score;
}

window.onload = createCrosswordGrid;
