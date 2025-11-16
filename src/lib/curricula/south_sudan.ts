
import { Level, Subject, Stream, Cycle } from '../types';

const subjects: Subject[] = [
  { id: 'sub-ss-1', name: 'Civic Education' },
  { id: 'sub-ss-2', name: 'Local Languages' },
];

const southSudanPrePrimaryLevels: Level[] = [
    { id: 'lvl-ss-n1', name: 'Nursery 1', age: '3–4', subjects: [{ id: 'sub-7', name: 'Language development' }, { id: 'sub-6', name: 'motor skills' }, { id: 'sub-6', name: 'songs & play' }] },
    { id: 'lvl-ss-n2', name: 'Nursery 2', age: '4–5', subjects: [{ id: 'sub-11', name: 'Early literacy' }, { id: 'sub-8', name: 'numeracy' }, { id: 'sub-13', name: 'hygiene' }, { id: 'sub-24', name: 'creative arts' }] },
    { id: 'lvl-ss-n3', name: 'Nursery 3', age: '5–6', subjects: [{ id: 'sub-5', name: 'Pre-reading' }, { id: 'sub-5', name: 'pre-writing' }, { id: 'sub-8', name: 'basic numeracy' }, { id: 'sub-13', name: 'moral education' }, { id: 'sub-18', name: 'Music & Art' }] },
];

const southSudanPrimarySubjects: Subject[] = [
    { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-ug-1', name: 'Local Language' }, { id: 'sub-ug-6', name: 'Social Studies' }, { id: 'sub-ug-5', name: 'Science' }, { id: 'sub-ug-7', name: 'Religious Education' }, { id: 'sub-18', name: 'Music & Art' }, { id: 'sub-19', name: 'Physical Education' }, { id: 'sub-22', name: 'ICT (intro)' }
];

const southSudanPrimaryLevels: Level[] = [
    { id: 'lvl-ss-p1', name: 'P1', subjects: southSudanPrimarySubjects.filter(s => s.id !== 'sub-22') },
    { id: 'lvl-ss-p2', name: 'P2', subjects: southSudanPrimarySubjects.filter(s => s.id !== 'sub-22') },
    { id: 'lvl-ss-p3', name: 'P3', subjects: southSudanPrimarySubjects.filter(s => s.id !== 'sub-22') },
    { id: 'lvl-ss-p4', name: 'P4', subjects: southSudanPrimarySubjects },
    { id: 'lvl-ss-p5', name: 'P5', subjects: southSudanPrimarySubjects },
    { id: 'lvl-ss-p6', name: 'P6', subjects: southSudanPrimarySubjects },
    { id: 'lvl-ss-p7', name: 'P7', subjects: southSudanPrimarySubjects },
    { id: 'lvl-ss-p8', name: 'P8', subjects: southSudanPrimarySubjects },
];

const southSudanLowerSecondarySubjects: Subject[] = [
    { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-ss-1', name: 'Civic Education' }, { id: 'sub-ug-7', name: 'Religious Studies' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-18', name: 'Art & Music' }, { id: 'sub-19', name: 'Physical Education' }
];

const southSudanLowerSecondaryLevels: Level[] = [
    { id: 'lvl-ss-s1', name: 'S1', subjects: southSudanLowerSecondarySubjects },
    { id: 'lvl-ss-s2', name: 'S2', subjects: southSudanLowerSecondarySubjects },
    { id: 'lvl-ss-s3', name: 'S3', subjects: southSudanLowerSecondarySubjects },
    { id: 'lvl-ss-s4', name: 'S4', subjects: southSudanLowerSecondarySubjects },
];

const southSudanUpperSecondaryStreams: Stream[] = [
    {
        id: 'stream-ss-sci', name: 'A. Science Stream', subjects: [
            { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-30', name: 'ICT / Computer Studies (Optional)' }, { id: 'sub-15', name: 'English' }, { id: 'sub-ug-1', name: 'Local Language / Kiswahili (Optional)' }, { id: 'sub-ss-1', name: 'Civic Education / General Paper (Optional)' }
        ]
    },
    {
        id: 'stream-ss-hum', name: 'B. Humanities / Arts Stream', subjects: [
            { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-ke-6', name: 'Literature in English' }, { id: 'sub-ss-1', name: 'Civics / Religious Studies (Optional)' }, { id: 'sub-15', name: 'English' }, { id: 'sub-22', name: 'ICT (Optional)' }
        ]
    },
    {
        id: 'stream-ss-lang', name: 'C. Languages Stream', subjects: [
            { id: 'sub-15', name: 'English' }, { id: 'sub-ss-2', name: 'Local Languages / Kiswahili' }, { id: 'sub-4', name: 'Literature' }, { id: 'sub-ss-1', name: 'Civics / Religious Studies (Optional)' }, { id: 'sub-22', name: 'ICT (Optional)' }
        ]
    },
    {
        id: 'stream-ss-tvet', name: 'D. Technical / Vocational Stream (TVET)', subjects: [
            { id: 'sub-tvet-net', name: 'Information Technology', subjects: [{ id: 'sub-bi-19', name: 'Programming' }, { id: 'sub-bi-20', name: 'Networking' }, { id: 'sub-ug-10', name: 'Computer Applications' }] },
            { id: 'sub-tvet-eng', name: 'Engineering / Industrial', subjects: [{ id: 'sub-ke-12', name: 'Mechanical' }, { id: 'sub-ke-13', name: 'Electrical' }, { id: 'sub-tvet-civil', name: 'Civil' }, { id: 'sub-ke-8', name: 'Technical Drawing' }] },
            { id: 'sub-tvet-agri', name: 'Agriculture', subjects: [{ id: 'sub-ke-14', name: 'Crop Science' }, { id: 'sub-ke-15', name: 'Animal Husbandry' }, { id: 'sub-ke-16', name: 'Agribusiness' }] },
            { id: 'sub-tvet-biz', name: 'Business Studies', subjects: [{ id: 'sub-bi-16', name: 'Accounting' }, { id: 'sub-ke-18', name: 'Commerce' }, { id: 'sub-29', name: 'Entrepreneurship' }] },
            { id: 'sub-tvet-health', name: 'Health Sciences', subjects: [{ id: 'sub-ke-19', name: 'Nursing' }, { id: 'sub-ug-12', name: 'Community Health' }, { id: 'sub-ke-20', name: 'First Aid' }] },
            { id: 'sub-tvet-hosp', name: 'Hospitality / Tourism', subjects: [{ id: 'sub-bi-28', name: 'Catering' }, { id: 'sub-tvet-hotel', name: 'Hotel Management' }] },
            { id: 'sub-tvet-arts', name: 'Fine & Applied Arts', subjects: [{ id: 'sub-18', name: 'Music' }, { id: 'sub-drc-12', name: 'Painting' }, { id: 'sub-tvet-tailor', name: 'Fashion' }, { id: 'sub-drc-13', name: 'Crafts' }] },
        ]
    }
];

const southSudanUpperSecondaryLevels: Level[] = [
    { id: 'lvl-ss-s5', name: 'S5', streams: southSudanUpperSecondaryStreams },
    { id: 'lvl-ss-s6', name: 'S6', streams: southSudanUpperSecondaryStreams },
];


const cycles: Cycle[] = [
    { id: 'cycle-ss-1', name: 'Pre-Primary / ECE', curriculumId: 'cur-7', levels: southSudanPrePrimaryLevels },
    { id: 'cycle-ss-2', name: 'Primary Education (P1-P8)', curriculumId: 'cur-7', levels: southSudanPrimaryLevels },
    { id: 'cycle-ss-3', name: 'Lower Secondary (S1-S4)', curriculumId: 'cur-7', levels: southSudanLowerSecondaryLevels },
    { id: 'cycle-ss-4', name: 'Upper Secondary (S5-S6)', curriculumId: 'cur-7', levels: southSudanUpperSecondaryLevels },
];

const levels: Level[] = [
    ...southSudanPrePrimaryLevels,
    ...southSudanPrimaryLevels,
    ...southSudanLowerSecondaryLevels,
    ...southSudanUpperSecondaryLevels,
];

export const southSudanCurriculum = {
    subjects,
    cycles,
    levels
};
