import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import SettingForm from '../components/Settings/SettingForm';
import { Setting } from '../components/Settings/Setting';

function SettingPage() {
    const [setting, setSetting] = useState<Setting>({ id: '', margin: 0, cleaning: 0 });

    const fetchSettings = async () => {
        const { data } = await axios.get('/api/settings');
        setSetting(data);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <Row className="g-4">
            <SettingForm setting={setting} />
        </Row>
    );
}

export default SettingPage;
