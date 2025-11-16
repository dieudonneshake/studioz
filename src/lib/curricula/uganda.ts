
import { Level, Subject, Stream, Cycle } from '../types';

const subjects: Subject[] = [
  { id: 'sub-ug-1', name: 'Local Language' },
  { id: 'sub-ug-2', name: 'Social & Religious Education (SRE)' },
  { id: 'sub-ug-3', name: 'Creative Arts' },
  { id: 'sub-ug-4', name: 'Environmental Studies' },
  { id: 'sub-ug-5', name: 'Science' },
  { id: 'sub-ug-6', name: 'Social Studies' },
  { id: 'sub-ug-7', name: 'Religious Education' },
  { id: 'sub-ug-8', name: 'Fine Arts' },
  { id: 'sub-ug-9', name: 'General Paper / Subsidiary' },
  { id: 'sub-ug-10', name: 'Computer Applications' },
  { id: 'sub-ug-11', name: 'Construction' },
  { id: 'sub-ug-12', name: 'Community Health' },
  { id: 'sub-ug-13', name: 'General Paper / Civics' },
];

const ugandaPrePrimaryLevels: Level[] = [
    { id: 'lvl-ug-n1', name: 'Nursery 1 (Baby Class)', age: '3-4', subjects: [{ id: 'sub-7', name: 'Language development' }, { id: 'sub-6', name: 'motor skills' }, { id: 'sub-9', name: 'social skills' }, { id: 'sub-6', name: 'songs & play' }] },
    { id: 'lvl-ug-n2', name: 'Nursery 2 (Middle Class)', age: '4-5', subjects: [{ id: 'sub-11', name: 'Early literacy' }, { id: 'sub-8', name: 'numeracy' }, { id: 'sub-9', name: 'social interaction' }, { id: 'sub-ke-5', name: 'art & music' }, { id: 'sub-13', name: 'hygiene' }] },
    { id: 'lvl-ug-n3', name: 'Nursery 3 (Top Class)', age: '5-6', subjects: [{ id: 'sub-5', name: 'Pre-reading' }, { id: 'sub-5', name: 'pre-writing' }, { id: 'sub-8', name: 'basic numeracy' }, { id: 'sub-13', name: 'morals' }, { id: 'sub-24', name: 'creativity' }] },
];

const ugandaPrimaryLowerSubjects: Subject[] = [
    { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-ug-1', name: 'Local Language' }, { id: 'sub-ug-2', name: 'Social & Religious Education (SRE)' }, { id: 'sub-ug-3', name: 'Creative Arts' }, { id: 'sub-19', name: 'Physical Education' }, { id: 'sub-ug-4', name: 'Environmental Studies' }
];

const ugandaPrimaryUpperSubjects: Subject[] = [
    { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-ug-5', name: 'Science' }, { id: 'sub-ug-6', name: 'Social Studies' }, { id: 'sub-ug-1', name: 'Local Language' }, { id: 'sub-ug-2', name: 'SRE' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-19', name: 'PE' }, { id: 'sub-ug-3', name: 'Creative Arts' }
];

const ugandaPrimaryLevels: Level[] = [
    { id: 'lvl-ug-p1', name: 'P1', subjects: ugandaPrimaryLowerSubjects },
    { id: 'lvl-ug-p2', name: 'P2', subjects: ugandaPrimaryLowerSubjects },
    { id: 'lvl-ug-p3', name: 'P3', subjects: ugandaPrimaryLowerSubjects },
    { id: 'lvl-ug-p4', name: 'P4', subjects: ugandaPrimaryUpperSubjects },
    { id: 'lvl-ug-p5', name: 'P5', subjects: ugandaPrimaryUpperSubjects },
    { id: 'lvl-ug-p6', name: 'P6', subjects: ugandaPrimaryUpperSubjects },
    { id: 'lvl-ug-p7', name: 'P7', subjects: ugandaPrimaryUpperSubjects },
];

const ugandaLowerSecondarySubjects: Subject[] = [
    { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-ug-7', name: 'Religious Education' }, { id: 'sub-ug-1', name: 'Local Language' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-ug-8', name: 'Fine Arts' }, { id: 'sub-19', name: 'Physical Education' }
];

const ugandaLowerSecondaryLevels: Level[] = [
    { id: 'lvl-ug-s1', name: 'S1', subjects: ugandaLowerSecondarySubjects },
    { id: 'lvl-ug-s2', name: 'S2', subjects: ugandaLowerSecondarySubjects },
    { id: 'lvl-ug-s3', name: 'S3', subjects: ugandaLowerSecondarySubjects },
    { id: 'lvl-ug-s4', name: 'S4', subjects: ugandaLowerSecondarySubjects },
];

const ugandaUpperSecondaryStreams: Stream[] = [
    {
        id: 'stream-ug-sci', name: 'A. Science Stream', subjects: [
            { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-30', name: 'ICT / Computer Studies (Optional)' }, { id: 'sub-ug-9', name: 'General Paper / Subsidiary' }
        ]
    },
    {
        id: 'stream-ug-hum', name: 'B. Humanities / Arts Stream', subjects: [
            { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-ke-6', name: 'Literature in English' }, { id: 'sub-ug-7', name: 'Religious Education (Optional)' }, { id: 'sub-ug-9', name: 'General Paper' }
        ]
    },
    {
        id: 'stream-ug-lang', name: 'C. Languages Stream', subjects: [
            { id: 'sub-15', name: 'English' }, { id: 'sub-ug-1', name: 'Local Language / Kiswahili' }, { id: 'sub-4', name: 'Literature' }, { id: 'sub-23', name: 'French / German / Arabic (Optional)' }, { id: 'sub-ug-13', name: 'General Paper' }
        ]
    },
    {
        id: 'stream-ug-tvet', name: 'D. Technical / Vocational Stream (TVET)', subjects: [
            { id: 'sub-tvet-net', name: 'Information Technology', subjects: [{ id: 'sub-bi-19', name: 'Programming' }, { id: 'sub-bi-20', name: 'Networking' }, { id: 'sub-ug-10', name: 'Computer Applications' }] },
            { id: 'sub-tvet-agri', name: 'Agriculture', subjects: [{ id: 'sub-ke-14', name: 'Crop Production' }, { id: 'sub-ke-15', name: 'Animal Husbandry' }, { id: 'sub-ke-16', name: 'Agribusiness' }] },
            { id: 'sub-tvet-biz', name: 'Business Studies', subjects: [{ id: 'sub-bi-16', name: 'Accounting' }, { id: 'sub-ke-18', name: 'Commerce' }, { id: 'sub-29', name: 'Entrepreneurship' }] },
            { id: 'sub-tvet-civil', name: 'Engineering', subjects: [{ id: 'sub-ke-12', name: 'Mechanics' }, { id: 'sub-ke-13', name: 'Electrical Technology' }, { id: 'sub-ug-11', name: 'Construction' }] },
            { id: 'sub-tvet-health', name: 'Health Sciences', subjects: [{ id: 'sub-ke-19', name: 'Nursing' }, { id: 'sub-ug-12', name: 'Community Health' }, { id: 'sub-ke-20', name: 'First Aid' }] },
            { id: 'sub-tvet-hosp', name: 'Hospitality & Tourism', subjects: [{ id: 'sub-bi-28', name: 'Catering' }, { id: 'sub-ke-17', name: 'Tourism' }, { id: 'sub-tvet-hotel', name: 'Hotel Management' }] },
        ]
    }
];

const ugandaUpperSecondaryLevels: Level[] = [
    { id: 'lvl-ug-s5', name: 'S5', streams: ugandaUpperSecondaryStreams },
    { id: 'lvl-ug-s6', name: 'S6', streams: ugandaUpperSecondaryStreams },
];


const cycles: Cycle[] = [
    { id: 'cycle-ug-1', name: 'Pre-Primary (ECE)', curriculumId: 'cur-4', levels: ugandaPrePrimaryLevels },
    { id: 'cycle-ug-2', name: 'Primary Education (P1-P7)', curriculumId: 'cur-4', levels: ugandaPrimaryLevels },
    { id: 'cycle-ug-3', name: 'Lower Secondary (S1-S4 / O-Level)', curriculumId: 'cur-4', levels: ugandaLowerSecondaryLevels },
    { id: 'cycle-ug-4', name: 'Upper Secondary (S5-S6 / A-Level)', curriculumId: 'cur-4', levels: ugandaUpperSecondaryLevels },
];

const levels: Level[] = [
    ...ugandaPrePrimaryLevels,
    ...ugandaPrimaryLevels,
    ...ugandaLowerSecondaryLevels,
    ...ugandaUpperSecondaryLevels,
];

export const ugandaCurriculum = {
    subjects,
    cycles,
    levels
};
