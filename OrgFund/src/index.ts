import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap } from "azle";
import express from "express";
import { time } from "azle";

/**
 * Class Transaction - Mewakili sebuah transaksi kas dalam aplikasi.
 */
class Transaction {
  id: string;
  type: "income" | "expense"; // Tipe transaksi: pendapatan atau pengeluaran
  description: string; // Deskripsi transaksi
  amount: number; // Jumlah transaksi
  createdBy: string; // Nama pengguna yang mencatat transaksi
  createdAt: Date; // Tanggal dibuat
  updatedAt: Date | null; // Tanggal terakhir diupdate (null jika belum pernah diupdate)
}

const transactionStorage = StableBTreeMap<string, Transaction>(0);

const app = express();
app.use(express.json());

/**
 * POST /transactions - Tambahkan transaksi baru (income atau expense).
 */
app.post("/transactions", (req, res) => {
  const transaction: Transaction = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    updatedAt: null,
    ...req.body,
  };
  transactionStorage.insert(transaction.id, transaction);
  res.json(transaction);
});

/**
 * GET /transactions - Dapatkan semua transaksi.
 */
app.get("/transactions", (req, res) => {
  res.json(transactionStorage.values());
});

/**
 * GET /transactions/:id - Dapatkan detail transaksi berdasarkan ID.
 */
app.get("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const transactionOpt = transactionStorage.get(transactionId);
  if (!transactionOpt) {
    res
      .status(404)
      .send(`Transaksi dengan ID=${transactionId} tidak ditemukan.`);
  } else {
    res.json(transactionOpt);
  }
});

/**
 * PUT /transactions/:id - Perbarui detail transaksi.
 */
app.put("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const transactionOpt = transactionStorage.get(transactionId);
  if (!transactionOpt) {
    res
      .status(400)
      .send(
        `Tidak dapat memperbarui transaksi dengan ID=${transactionId}. Tidak ditemukan.`
      );
  } else {
    const transaction = transactionOpt;

    const updatedTransaction = {
      ...transaction,
      ...req.body,
      updatedAt: getCurrentDate(),
    };
    transactionStorage.insert(transaction.id, updatedTransaction);
    res.json(updatedTransaction);
  }
});

/**
 * DELETE /transactions/:id - Hapus transaksi berdasarkan ID.
 */
app.delete("/transactions/:id", (req, res) => {
  const transactionId = req.params.id;
  const deletedTransaction = transactionStorage.remove(transactionId);
  if (!deletedTransaction) {
    res
      .status(400)
      .send(
        `Tidak dapat menghapus transaksi dengan ID=${transactionId}. Tidak ditemukan.`
      );
  } else {
    res.json(deletedTransaction);
  }
});

app.listen();

/**
 * Fungsi untuk mendapatkan tanggal saat ini dalam format ICP.
 */
function getCurrentDate() {
  const timestamp = new Number(time());
  return new Date(timestamp.valueOf() / 1000_000);
}
