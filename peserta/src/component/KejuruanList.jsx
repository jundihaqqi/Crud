import { useState, useEffect } from "react";
import { getKejuruans, deleteKejuruan } from "../service/api";

const KejuruanList = ({onEdit}) => {
    const [kejuruans, setKejuruans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchKejuruans();
    }, []);

    const fetchKejuruans = async () => {
        try {
            const respone = await getKejuruans();
            setKejuruans(respone.data);
            setLoading(false);
        } catch(error) {
            console.error('error fetching data:', error);
            setLoading(false);
        }    
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin Mau Di Hapus King?')) {
            try {
                await deleteKejuruan(id);
                fetchKejuruans();
            } catch (error) {
                alert ( 'gagal menghapus data')
            }
        }
    };

    if (loading) return <div className="text-center">Loading</div>;
    
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Jumlah</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kejuruans.map((kejuruan, i) => (
                        <tr key={kejuruan.id}>
                            <td>{i + 1}</td>
                            <td>{kejuruan.nama}</td>
                            <td>{kejuruan.absensi?.length || 0}</td>
                            <td>
                                <button className="btn btn-sm btn-warning me-2"
                                    onClick={() => onEdit(kejuruan)}>
                                        Edit
                                </button>
                                <button className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(kejuruan.id)}>
                                        Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
 
};

export default KejuruanList;