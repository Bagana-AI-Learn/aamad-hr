# Instruksi Chat – Onboarding Assistant

Chat ini adalah **Asisten Onboarding** untuk proses onboarding karyawan (dokumen, IT, pelatihan, koordinasi).

---

## Instruksi untuk Agent (Backend)

Agent diarahkan untuk:

- **Menjawab pertanyaan user secara langsung** dengan info konkret (mis. daftar dokumen, langkah IT, pelatihan).
- **Tidak meminta Employee ID / Workflow ID**. Chat tidak mengumpulkan keduanya; jawab selalu berdasarkan pengetahuan umum onboarding.
- Menghindari **respons template yang sama** untuk setiap pertanyaan; jawaban disesuaikan dengan pertanyaan.
- Merespons **hanya plain text**; tidak boleh JSON, code block, atau markdown.

Potongan instruksi (dari `crew_manager`):

```
ANSWER THE USER'S QUESTION DIRECTLY. Give concrete, specific information.
NEVER ask for Employee ID or Workflow ID. The chat does not collect them.
Avoid repetitive template responses. Vary your answer based on the actual question.
Reply in plain text only. No JSON, code blocks, or markdown.
```

---

## Contoh Pertanyaan yang Sesuai

Gunakan pertanyaan yang berkaitan dengan onboarding. Berikut contohnya:

### Dokumen

- *Dokumen apa saja yang harus saya siapkan untuk onboarding?*
- *Bagaimana cara mengirim I-9 dan W-4?*
- *Kapan batas waktu pengumpulan dokumen onboarding?*

### IT & Akses

- *Bagaimana proses permintaan akses email dan sistem?*
- *Kapan saya bisa mendapatkan akses VPN dan laptop?*
- *Siapa yang mengurus provisioning IT untuk karyawan baru?*

### Pelatihan

- *Pelatihan apa yang wajib untuk karyawan baru?*
- *Bagaimana jadwal orientation dan training?*
- *Di mana saya bisa mengakses modul pelatihan?*

### Proses umum

- *Apa saja langkah onboarding dari hari pertama sampai selesai?*
- *Siapa buddy atau mentor saya?*
- *Kapan saya bertemu dengan manajer untuk onboarding?*

### Lainnya

- *Saya sudah kirim dokumen, apa langkah berikutnya?*
- *Status onboarding saya saat ini seperti apa?*

---

## Employee ID / Workflow ID — Apa yang harus diisi?

**Anda tidak perlu mengisi apa pun.** Cukup ketik pertanyaan Anda di chat dan kirim.

- Chat **tidak meminta** dan **tidak mengumpulkan** Employee ID atau Workflow ID.
- Assistant menjawab berdasarkan pengetahuan umum seputar onboarding.
- Jika muncul pesan “Could you please provide Employee ID or Workflow ID?”, itu tidak seharusnya terjadi; instruksi agent sudah diperbarui agar tidak meminta keduanya.

*Employee ID* = identifikasi karyawan di sistem (biasanya dari HRIS). *Workflow ID* = ID unik untuk satu proses onboarding. Untuk MVP, chat tidak menggunakan keduanya.

---

## Batasan

- **Panjang pesan**: Maksimal 2.000 karakter per pesan.
- **Format respons**: Hanya teks. UI menampilkan plain text saja; JSON tidak ditampilkan.
- **Konteks**: Agent bisa memakai `employee_id` dan `workflow_id` jika dikirim; untuk MVP chat tidak mengirim keduanya.

---

## Ringkasan

| Aspek | Keterangan |
|-------|------------|
| **Topik** | Onboarding karyawan (dokumen, IT, pelatihan, koordinasi) |
| **Format jawaban** | Plain text saja |
| **Contoh prompt** | Lihat daftar "Contoh Pertanyaan yang Sesuai" di atas |
