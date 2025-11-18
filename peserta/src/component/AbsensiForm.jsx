import { useState, useEffect } from "react";
import { getKejuruans, createAbsensi, updateAbsensi } from "../service/api";

const AbsensiForm = ({ absensi, onSuccess }) => {
    const [formData, setFormData] = useState({
        nama_kejuruan: '',
        hadir: '',
        keterangan: '',
        KejuruanId: ''
    });
    const [kejuruans, setKejuruans] = useState([]);

    useEffect(() => {
        if (absensi) {
            setFormData({
                nama_kejuruan: absensi.nama_kejuruan,
                hadir: absensi.hadir,
                keterangan: absensi.keterangan,
                KejuruanId: absensi.KejuruanId
            });
        }
    }, [absensi]);

    useEffect(() => {
        fetchKejuruans();
    }, []);

    const fetchKejuruans = async () => {
        try {
            const response = await getKejuruans();
            setKejuruans(response.data);
        } catch (error) {
            console.error('error fetching data:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                nama_kejuruan: formData.nama_kejuruan,
                hadir: parseInt(formData.hadir),
                keterangan: formData.keterangan,
                KejuruanId: parseInt(formData.KejuruanId),
            };

            if (absensi) {
                await updateAbsensi(absensi.id, data);
            } else {
                await createAbsensi(data);
            }

            setFormData({ nama_kejuruan: '', hadir: '', keterangan: '', KejuruanId: '' });
            onSuccess();
        } catch (error) {
            console.error('Error saving data:', error);
            alert("Gagal menyimpan data");
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">
                    {absensi ? "Edit" : "Tambah"} Absensi
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nama Kejuruan</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nama_kejuruan"
                            value={formData.nama_kejuruan}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Hadir</label>
                        <input
                            type="number"
                            className="form-control"
                            name="hadir"
                            value={formData.hadir}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Keterangan</label>
                        <input
                            type="text"
                            className="form-control"
                            name="keterangan"
                            value={formData.keterangan}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Kejuruan</label>
                        <select
                            name="KejuruanId"
                            className="form-select"
                            value={formData.KejuruanId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Pilih Kejuruan</option>
                            {kejuruans.map((k) => (
                                <option key={k.id} value={k.id}>
                                    {k.nama}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Simpan</button>
                    {absensi && (
                        <button
                            type="button"
                            className="btn btn-secondary ms-2"
                            onClick={() => {
                                setFormData({ nama_kejuruan: '', hadir: '', keterangan: '', KejuruanId: '' });
                                onSuccess();
                            }}
                        >
                            Batal
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AbsensiForm;