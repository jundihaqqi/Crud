import { useState } from "react";
import KejuruanForm from '../component/KejuruanForm';
import KejuruanList from "../component/KejuruanList";

const KejuruanPages = () => {
    const [selected, setSelected] =useState(null);
    const [refresh, setRefresh] = useState(0);

    const handleSuccess = () => {
        setSelected(null);
        setRefresh(prev => prev + 1);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Absensi Kejuruan</h2>
            <KejuruanForm
                kejuruan={selected}
                onSuccess={handleSuccess}
            />
            <KejuruanList
                key={refresh}
                onEdit={setSelected}
            />
        </div>
    );
};

export default KejuruanPages;