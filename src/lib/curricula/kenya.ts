
import { Level, Subject, Stream, Cycle } from '../types';

const subjects: Subject[] = [
  { id: 'sub-ke-1', name: 'Environmental Studies (Kenya)' },
  { id: 'sub-ke-2', name: 'Religious Education (Kenya)' },
  { id: 'sub-ke-3', name: 'Science (Kenya)' },
  { id: 'sub-ke-4', name: 'Social Studies (Kenya)' },
  { id: 'sub-ke-5', name: 'Art & Music (Kenya)' },
  { id: 'sub-ke-6', name: 'Literature in English' },
  { id: 'sub-ke-7', name: 'CRE / Islamic Studies' },
  { id: 'sub-ke-8', name: 'Technical Drawing' },
  { id: 'sub-ke-9', name: 'Agriculture' },
  { id: 'sub-ke-10', name: 'German / Arabic / Local Languages' },
  { id: 'sub-ke-11', name: 'Digital Literacy' },
  { id: 'sub-ke-12', name: 'Mechanics' },
  { id: 'sub-ke-13', name: 'Electrical Technology' },
  { id: 'sub-ke-14', name: 'Crop Science' },
  { id: 'sub-ke-15', name: 'Animal Husbandry' },
  { id: 'sub-ke-16', name: 'Agribusiness' },
  { id: 'sub-ke-17', name: 'Tourism Geography' },
  { id: 'sub-ke-18', name: 'Commerce' },
  { id: 'sub-ke-19', name: 'Nursing' },
  { id: 'sub-ke-20', name: 'First Aid' },
  { id: 'sub-ke-21', name: 'Community Health' },
];

const kenyaPrePrimaryLevels: Level[] = [
    { id: 'lvl-ke-pp1', name: 'Pre-primary 1 (PP1)', age: '4-5', subjects: [{ id: 'sub-5', name: 'Early literacy & numeracy' }, { id: 'sub-6', name: 'motor skills' }, { id: 'sub-9', name: 'social-emotional development' }, { id: 'sub-6', name: 'songs & play' }] },
    { id: 'lvl-ke-pp2', name: 'Pre-primary 2 (PP2)', age: '5-6', subjects: [{ id: 'sub-5', name: 'Early reading & writing' }, { id: 'sub-8', name: 'counting' }, { id: 'sub-ke-1', name: 'environment exploration' }, { id: 'sub-13', name: 'moral values' }, { id: 'sub-24', name: 'creative arts' }] },
];

const kenyaPrimarySubjects: Subject[] = [{ id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-ke-1', name: 'Environmental Studies' }, { id: 'sub-ke-2', name: 'Religious Education' }, { id: 'sub-ke-5', name: 'Music & Art' }, { id: 'sub-19', name: 'Physical Education' }];
const kenyaUpperPrimarySubjects: Subject[] = [{ id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-ke-3', name: 'Science' }, { id: 'sub-ke-4', name: 'Social Studies' }, { id: 'sub-ke-2', name: 'Religious Education' }, { id: 'sub-ke-5', name: 'Music & Art' }, { id: 'sub-19', name: 'Physical Education' }];

const kenyaPrimaryLevels: Level[] = [
    { id: 'lvl-ke-g1', name: 'Grade 1', subjects: kenyaPrimarySubjects },
    { id: 'lvl-ke-g2', name: 'Grade 2', subjects: kenyaPrimarySubjects },
    { id: 'lvl-ke-g3', name: 'Grade 3', subjects: kenyaPrimarySubjects },
    { id: 'lvl-ke-g4', name: 'Grade 4', subjects: kenyaUpperPrimarySubjects },
    { id: 'lvl-ke-g5', name: 'Grade 5', subjects: kenyaUpperPrimarySubjects },
    { id: 'lvl-ke-g6', name: 'Grade 6', subjects: kenyaUpperPrimarySubjects },
];

const kenyaJuniorSecondarySubjects: Subject[] = [{ id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-ke-3', name: 'Science (Biology, Chemistry, Physics intro)' }, { id: 'sub-ke-4', name: 'Social Studies' }, { id: 'sub-ke-2', name: 'Religious Education' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-19', name: 'Physical Education' }, { id: 'sub-ke-5', name: 'Art & Music' }];

const kenyaJuniorSecondaryLevels: Level[] = [
    { id: 'lvl-ke-g7', name: 'Grade 7', subjects: kenyaJuniorSecondarySubjects },
    { id: 'lvl-ke-g8', name: 'Grade 8', subjects: kenyaJuniorSecondarySubjects },
    { id: 'lvl-ke-g9', name: 'Grade 9', subjects: kenyaJuniorSecondarySubjects },
];

const kenyaSeniorSecondaryStreams: Stream[] = [
    {
        id: 'stream-ke-sci', name: 'A. Science Stream', subjects: [
            { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-15', name: 'English' }, { id: 'sub-22', name: 'ICT / Computer Studies (Optional)' }, { id: 'sub-ke-9', name: 'Agriculture / Technical Drawing (Optional)' }, { id: 'sub-ke-2', name: 'Religious Education (Optional)' }
        ]
    },
    {
        id: 'stream-ke-hum', name: 'B. Humanities / Arts Stream', subjects: [
            { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-ke-6', name: 'Literature in English' }, { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-15', name: 'English' }, { id: 'sub-ke-7', name: 'CRE / Islamic Studies (Optional)' }, { id: 'sub-22', name: 'ICT / Technical Drawing (Optional)' }
        ]
    },
    {
        id: 'stream-ke-lang', name: 'C. Languages Stream', subjects: [
            { id: 'sub-15', name: 'English' }, { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-23', name: 'French (Optional)' }, { id: 'sub-ke-10', name: 'German / Arabic / Local Languages (Optional)' }, { id: 'sub-4', name: 'Literature' }, { id: 'sub-22', name: 'ICT (Optional)' }
        ]
    },
    {
        id: 'stream-ke-tvet', name: 'D. Technical / Vocational Stream (TVET)', subjects: [
            { id: 'sub-tvet-net', name: 'Information Technology', subjects: [{ id: 'sub-bi-19', name: 'Programming' }, { id: 'sub-bi-20', name: 'Networking' }, { id: 'sub-ke-11', name: 'Digital Literacy' }] },
            { id: 'sub-tvet-civil', name: 'Engineering', subjects: [{ id: 'sub-ke-12', name: 'Mechanics' }, { id: 'sub-ke-13', name: 'Electrical Technology' }, { id: 'sub-bi-26', name: 'Workshop Practice' }] },
            { id: 'sub-tvet-agri', name: 'Agriculture', subjects: [{ id: 'sub-ke-14', name: 'Crop Science' }, { id: 'sub-ke-15', name: 'Animal Husbandry' }, { id: 'sub-ke-16', name: 'Agribusiness' }] },
            { id: 'sub-tvet-hosp', name: 'Hospitality & Tourism', subjects: [{ id: 'sub-bi-28', name: 'Catering' }, { id: 'sub-ke-17', name: 'Tourism Geography' }, { id: 'sub-bi-27', name: 'Hospitality' }] },
            { id: 'sub-tvet-biz', name: 'Business Studies', subjects: [{ id: 'sub-bi-16', name: 'Accounting' }, { id: 'sub-ke-18', name: 'Commerce' }, { id: 'sub-29', name: 'Entrepreneurship' }] },
            { id: 'sub-tvet-health', name: 'Health Sciences', subjects: [{ id: 'sub-ke-19', name: 'Nursing' }, { id: 'sub-ke-20', name: 'First Aid' }, { id: 'sub-ke-21', name: 'Community Health' }] }
        ]
    }
];

const kenyaSeniorSecondaryLevels: Level[] = [
    { id: 'lvl-ke-g10', name: 'Grade 10', streams: kenyaSeniorSecondaryStreams },
    { id: 'lvl-ke-g11', name: 'Grade 11', streams: kenyaSeniorSecondaryStreams },
    { id: 'lvl-ke-g12', name: 'Grade 12', streams: kenyaSeniorSecondaryStreams },
];


const cycles: Cycle[] = [
    { id: 'cycle-ke-1', name: 'Pre-primary (ECE)', curriculumId: 'cur-3', levels: kenyaPrePrimaryLevels },
    { id: 'cycle-ke-2', name: 'Primary Education (Grades 1-6)', curriculumId: 'cur-3', levels: kenyaPrimaryLevels },
    { id: 'cycle-ke-3', name: 'Lower Secondary (Grades 7-9)', curriculumId: 'cur-3', levels: kenyaJuniorSecondaryLevels },
    { id: 'cycle-ke-4', name: 'Upper Secondary (Grades 10-12)', curriculumId: 'cur-3', levels: kenyaSeniorSecondaryLevels },
];

const levels: Level[] = [
    ...kenyaPrePrimaryLevels,
    ...kenyaPrimaryLevels,
    ...kenyaJuniorSecondaryLevels,
    ...kenyaSeniorSecondaryLevels,
];

export const kenyaCurriculum = {
    subjects,
    cycles,
    levels
};

