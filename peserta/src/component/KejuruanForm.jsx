import { useState, useEffect } from "react";
import { createKejuruan, updateKejuruan } from "../service/api";

const KejuruanForm = ({ kejuruan, onSuccess }) => {
    const [nama, setNama] = useState("");

    useEffect(() => {
        if (kejuruan) {
            setNama(kejuruan.nama);
        } else {
            setNama("");
        }
    }, [kejuruan]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (kejuruan) {
                await updateKejuruan(kejuruan.id, { nama });
            } else {
                await createKejuruan({ nama });
            }

            if (onSuccess) onSuccess();
        } catch (error) {
            alert("Gagal menyimpan data");
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">
                    {kejuruan ? "Edit" : ""} Kejuruan
                </h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Program Latihan</label>
                        <input
                            type="text"
                            className="form-control"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-primary">Simpan</button>
                     {kejuruan && (
                        <button type='button' className="btn btn-secondary ms-2"
                        onClick={() => {
                            setNama('');
                            onSuccess();
                        }}>
                            Batal
                        </button>
                    )}

                </form>
            </div>
        </div>
    );
};

export default KejuruanForm;