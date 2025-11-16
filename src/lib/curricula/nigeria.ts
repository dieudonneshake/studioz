
import { Level, Subject, Stream, Cycle } from '../types';

const subjects: Subject[] = [
  { id: 'sub-ng-1', name: 'Basic Science' },
  { id: 'sub-ng-2', name: 'Social Studies' },
  { id: 'sub-ng-3', name: 'Civic Education' },
  { id: 'sub-ng-4', name: 'Mother Tongue' },
  { id: 'sub-ng-5', name: 'Basic Technology' },
  { id: 'sub-ng-6', name: 'Agriculture' },
  { id: 'sub-ng-7', name: 'Religious Studies' },
  { id: 'sub-ng-8', name: 'Further Mathematics' },
  { id: 'sub-ng-9', name: 'Government' },
  { id: 'sub-ng-10', name: 'Commerce' },
  { id: 'sub-ng-11', name: 'Accounting' },
  { id: 'sub-ng-12', name: 'Technical Drawing' },
  { id: 'sub-ng-13', name: 'Metalwork' },
  { id: 'sub-ng-14', name: 'Woodwork' },
  { id: 'sub-ng-15', name: 'Home Economics' },
  { id: 'sub-ng-16', name: 'Food & Nutrition' },
  { id: 'sub-ng-17', name: 'Textile' },
];

const nigeriaPrePrimaryLevels: Level[] = [
    { id: 'lvl-ng-n1', name: 'Nursery 1', age: '3–4', subjects: [{ id: 'sub-7', name: 'Language development' }, { id: 'sub-6', name: 'Motor skills' }, { id: 'sub-9', name: 'Social skills' }] },
    { id: 'lvl-ng-n2', name: 'Nursery 2', age: '4–5', subjects: [{ id: 'sub-11', name: 'Early literacy' }, { id: 'sub-8', name: 'Numeracy' }, { id: 'sub-24', name: 'Creativity' }, { id: 'sub-13', name: 'Hygiene' }] },
    { id: 'lvl-ng-kg1', name: 'Nursery 3 / KG1', age: '5–6', subjects: [{ id: 'sub-5', name: 'Pre-reading' }, { id: 'sub-5', name: 'Pre-writing' }, { id: 'sub-8', name: 'Basic numeracy' }] },
    { id: 'lvl-ng-kg2', name: 'KG2', age: '6–7', subjects: [{ id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-9', name: 'Social & Emotional Skills' }] },
];

const nigeriaPrimarySubjects: Subject[] = [
    { id: 'sub-15', name: 'English' },
    { id: 'sub-3', name: 'Mathematics' },
    { id: 'sub-ng-1', name: 'Basic Science' },
    { id: 'sub-ng-2', name: 'Social Studies' },
    { id: 'sub-ng-3', name: 'Civic Education' },
    { id: 'sub-18', name: 'Music & Art' },
    { id: 'sub-19', name: 'Physical Education' },
    { id: 'sub-ng-4', name: 'Mother Tongue' },
];

const nigeriaPrimaryLevels: Level[] = [
    { id: 'lvl-ng-p1', name: 'Primary 1', subjects: nigeriaPrimarySubjects },
    { id: 'lvl-ng-p2', name: 'Primary 2', subjects: nigeriaPrimarySubjects },
    { id: 'lvl-ng-p3', name: 'Primary 3', subjects: nigeriaPrimarySubjects },
    { id: 'lvl-ng-p4', name: 'Primary 4', subjects: [...nigeriaPrimarySubjects, { id: 'sub-22', name: 'ICT' }] },
    { id: 'lvl-ng-p5', name: 'Primary 5', subjects: [...nigeriaPrimarySubjects, { id: 'sub-22', name: 'ICT' }] },
    { id: 'lvl-ng-p6', name: 'Primary 6', subjects: [...nigeriaPrimarySubjects, { id: 'sub-22', name: 'ICT' }] },
];

const nigeriaJSSSubjects: Subject[] = [
    { id: 'sub-15', name: 'English' },
    { id: 'sub-3', name: 'Mathematics' },
    { id: 'sub-ng-1', name: 'Basic Science' },
    { id: 'sub-ng-5', name: 'Basic Technology' },
    { id: 'sub-ng-2', name: 'Social Studies' },
    { id: 'sub-ng-3', name: 'Civic Education' },
    { id: 'sub-22', name: 'ICT' },
    { id: 'sub-ng-6', name: 'Agriculture' },
    { id: 'sub-18', name: 'Music & Art' },
    { id: 'sub-19', name: 'Physical Education' },
    { id: 'sub-ng-7', name: 'Religious Studies' },
];

const nigeriaJSSLevels: Level[] = [
    { id: 'lvl-ng-jss1', name: 'JSS1', subjects: nigeriaJSSSubjects },
    { id: 'lvl-ng-jss2', name: 'JSS2', subjects: nigeriaJSSSubjects },
    { id: 'lvl-ng-jss3', name: 'JSS3', subjects: nigeriaJSSSubjects },
];

const nigeriaSSSStreams: Stream[] = [
    {
        id: 'stream-ng-sci', name: 'A. Science Stream', subjects: [
            { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-ng-8', name: 'Further Mathematics' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-ng-3', name: 'Civic Education' }, { id: 'sub-19', name: 'Physical Education' }
        ]
    },
    {
        id: 'stream-ng-arts', name: 'B. Arts / Humanities Stream', subjects: [
            { id: 'sub-15', name: 'English' }, { id: 'sub-4', name: 'Literature in English' }, { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-ng-9', name: 'Government' }, { id: 'sub-ng-3', name: 'Civic Education' }, { id: 'sub-ng-7', name: 'Religious Studies' }, { id: 'sub-ug-8', name: 'Fine Arts' }, { id: 'sub-18', name: 'Music' }, { id: 'sub-22', name: 'ICT' }
        ]
    },
    {
        id: 'stream-ng-comm', name: 'C. Commercial / Business Stream', subjects: [
            { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-ng-11', name: 'Accounting' }, { id: 'sub-ng-10', name: 'Commerce' }, { id: 'sub-ng-3', name: 'Civic Education' }, { id: 'sub-22', name: 'ICT' }
        ]
    },
    {
        id: 'stream-ng-tvet', name: 'D. Technical / Vocational Stream (TVET)', subjects: [
            { id: 'sub-tvet-eng', name: 'Engineering / Technical', subjects: [{ id: 'sub-ng-12', name: 'Technical Drawing' }, { id: 'sub-ng-13', name: 'Metalwork' }, { id: 'sub-ng-14', name: 'Woodwork' }, { id: 'sub-tvet-repair', name: 'Electronics' }, { id: 'sub-22', name: 'ICT' }] },
            { id: 'sub-tvet-agri', name: 'Agriculture', subjects: [{ id: 'sub-tvet-crop', name: 'Crop Production' }, { id: 'sub-tvet-animal', name: 'Animal Husbandry' }, { id: 'sub-ke-16', name: 'Agribusiness' }] },
            { id: 'sub-tvet-home-econ', name: 'Home Economics / Hospitality', subjects: [{ id: 'sub-ng-15', name: 'Home Economics' }, { id: 'sub-bi-28', name: 'Catering' }, { id: 'sub-ng-16', name: 'Food & Nutrition' }, { id: 'sub-ng-17', name: 'Textile' }, { id: 'sub-tvet-tailor', name: 'Fashion' }] },
            { id: 'sub-tvet-it', name: 'Information Technology', subjects: [{ id: 'sub-bi-19', name: 'Programming' }, { id: 'sub-bi-20', name: 'Networking' }, { id: 'sub-ke-11', name: 'Digital Literacy' }] },
            { id: 'sub-tvet-arts', name: 'Fine Arts / Music', subjects: [{ id: 'sub-drc-12', name: 'Drawing' }, { id: 'sub-drc-12', name: 'Painting' }, { id: 'sub-18', name: 'Music' }, { id: 'sub-drc-13', name: 'Crafts' }] },
        ]
    }
];

const nigeriaSSSLevels: Level[] = [
    { id: 'lvl-ng-sss1', name: 'SSS 1', streams: nigeriaSSSStreams },
    { id: 'lvl-ng-sss2', name: 'SSS 2', streams: nigeriaSSSStreams },
    { id: 'lvl-ng-sss3', name: 'SSS 3', streams: nigeriaSSSStreams },
];

const cycles: Cycle[] = [
    { id: 'cycle-ng-1', name: 'Early Childhood Education (Pre-Primary)', curriculumId: 'cur-8', levels: nigeriaPrePrimaryLevels },
    { id: 'cycle-ng-2', name: 'Primary Education (Grades 1-6)', curriculumId: 'cur-8', levels: nigeriaPrimaryLevels },
    { id: 'cycle-ng-3', name: 'Junior Secondary School (JSS 1-3)', curriculumId: 'cur-8', levels: nigeriaJSSLevels },
    { id: 'cycle-ng-4', name: 'Senior Secondary School (SSS 1-3)', curriculumId: 'cur-8', levels: nigeriaSSSLevels },
];

const levels: Level[] = [
    ...nigeriaPrePrimaryLevels,
    ...nigeriaPrimaryLevels,
    ...nigeriaJSSLevels,
    ...nigeriaSSSLevels,
];

export const nigeriaCurriculum = {
    subjects,
    cycles,
    levels,
};
