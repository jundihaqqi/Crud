import { useState, useEffect } from "react";
import { getAbsensis, deleteAbsensi } from "../service/api";

const AbsensiList = ({ onEdit }) => {
    const [absensis, setAbsensis] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAbsensis();
    }, []);

    const fetchAbsensis = async () => {
        try {
            const response = await getAbsensis();
            setAbsensis(response.data);
            setLoading(false);
        } catch (error) {
            console.error('error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin Mau Di Hapus King?')) {
            try {
                await deleteAbsensi(id);
                fetchAbsensis();
            } catch (error) {
                alert('Gagal menghapus data');
            }
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Nama Kejuruan</th>
                        <th>Hadir</th>
                        <th>Keterangan</th>
                        <th>Kejuruan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {absensis.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">
                                Tidak ada data absensi
                            </td>
                        </tr>
                    ) : (
                        absensis.map((absensi, i) => (
                            <tr key={absensi.id}>
                                <td>{i + 1}</td>
                                <td>{absensi.nama_kejuruan}</td>
                                <td>{absensi.hadir}</td>
                                <td>{absensi.keterangan}</td>
                                <td>{absensi.kejuruan?.nama || '-'}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2"
                                        onClick={() => onEdit(absensi)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(absensi.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AbsensiList;