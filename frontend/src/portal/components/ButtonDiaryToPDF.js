import React from 'react';
import {PrinterIcon} from "@heroicons/react/16/solid";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ButtonDiaryToPDF = ({ data }) => {
    const handleDownload = () => {
        const doc = new jsPDF({ orientation: "landscape", format: "a4" });
        doc.text('IBS Diary Entries', 10, 10);
        if (!Array.isArray(data) || data.length === 0) {
            doc.text('No data available', 10, 20);
        } else {
            const filteredData = data.map(entry => {
                const { _id, user_id, __v, ...rest } = entry;
                return rest;
            });
            const tableHeaders = Object.keys(filteredData[0]);
            const tableData = filteredData.map(entry => Object.values(entry));
            doc.autoTable({
                head: [tableHeaders],
                body: tableData,
                startY: 20,
                theme: 'grid',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [244, 214, 104], textColor: 0 }
            });
        }
        doc.save(`ibs_diary_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <button
            onClick={handleDownload}
            className="flex justify-between px-4 py-2 bg-black text-primary rounded-lg items-center hover:bg-secondary"
        >
            <PrinterIcon className="h-5 w-5" />
        </button>
    );
};

export default ButtonDiaryToPDF;