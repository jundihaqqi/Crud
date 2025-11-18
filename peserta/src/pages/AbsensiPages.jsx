import { useState } from "react";
import AbsensiForm from '../component/AbsensiForm';
import AbsensiList from "../component/AbsensiList";

const AbsensiPages = () => {
    const [selected, setSelected] =useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleSuccess = () => {
        setSelected(null);
        setRefresh(prev => prev + 1);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Manajemen Absensi</h2>
            <AbsensiForm
                Absensi={selected}
                onSuccess={handleSuccess}
            />
            <AbsensiList
                key={refresh}
                onEdit={setSelected}
            />
        </div>
    );
};

export default AbsensiPages;