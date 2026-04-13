import React from 'react';
import HistoryUI from '../components/History/HistoryUI';
import { useHistory } from '../hooks/useHistory';

function HistoryPage({ user, project, backToEditor }) {
    const historyData = useHistory(project.id);

    return (
        <HistoryUI
            projectName={project.title}
            backToEditor={backToEditor}
            {...historyData}
        />
    );
}

export default HistoryPage;