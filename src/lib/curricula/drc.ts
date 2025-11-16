
import { Level, Subject, Stream, Cycle } from '../types';

const subjects: Subject[] = [
    { id: 'sub-drc-1', name: 'Local Language (Lingala/Kikongo/Swahili)' },
    { id: 'sub-drc-2', name: 'Environmental Studies' },
    { id: 'sub-drc-3', name: 'Religious Education' },
    { id: 'sub-drc-4', name: 'Music & Art' },
    { id: 'sub-drc-5', name: 'Science' },
    { id: 'sub-drc-6', name: 'Social Studies' },
    { id: 'sub-drc-7', name: 'Civic Education' },
    { id: 'sub-drc-8', name: 'Arts' },
    { id: 'sub-drc-9', name: 'Philosophy / Ethics' },
    { id: 'sub-drc-10', name: 'Literature (French / Local)' },
    { id: 'sub-drc-11', name: 'Drafting' },
    { id: 'sub-drc-12', name: 'Fine & Applied Arts' },
    { id: 'sub-drc-13', name: 'Craft' },
];

const drcPrePrimaryLevels: Level[] = [
    { id: 'lvl-drc-n1', name: 'Nursery 1', age: '3-4', subjects: [{ id: 'sub-7', name: 'Language development (French & local language)' }, { id: 'sub-6', name: 'motor skills' }, { id: 'sub-9', name: 'social skills' }, { id: 'sub-6', name: 'songs & play' }] },
    { id: 'lvl-drc-n2', name: 'Nursery 2', age: '4-5', subjects: [{ id: 'sub-11', name: 'Early literacy' }, { id: 'sub-8', name: 'numeracy' }, { id: 'sub-24', name: 'creative arts' }, { id: 'sub-13', name: 'hygiene' }, { id: 'sub-9', name: 'social interaction' }] },
    { id: 'lvl-drc-n3', name: 'Nursery 3', age: '5-6', subjects: [{ id: 'sub-5', name: 'Pre-reading' }, { id: 'sub-5', name: 'pre-writing' }, { id: 'sub-12', name: 'basic numeracy' }, { id: 'sub-13', name: 'moral education' }, { id: 'sub-drc-4', name: 'arts & music' }] },
];

const drcPrimarySubjects: Subject[] = [
    { id: 'sub-23', name: 'French' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-drc-1', name: 'Local Language (Lingala/Kikongo/Swahili)' }, { id: 'sub-drc-2', name: 'Environmental Studies' }, { id: 'sub-drc-3', name: 'Religious Education' }, { id: 'sub-drc-4', name: 'Music & Art' }, { id: 'sub-19', name: 'Physical Education' }
];

const drcUpperPrimarySubjects: Subject[] = [
    { id: 'sub-23', name: 'French' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-drc-5', name: 'Science' }, { id: 'sub-drc-6', name: 'Social Studies' }, { id: 'sub-drc-1', name: 'Local Language' }, { id: 'sub-drc-3', name: 'Religious Education' }, { id: 'sub-drc-4', name: 'Music & Art' }, { id: 'sub-19', name: 'Physical Education' }
];

const drcPrimaryLevels: Level[] = [
    { id: 'lvl-drc-p1', name: 'Grade 1', subjects: drcPrimarySubjects },
    { id: 'lvl-drc-p2', name: 'Grade 2', subjects: drcPrimarySubjects },
    { id: 'lvl-drc-p3', name: 'Grade 3', subjects: drcPrimarySubjects },
    { id: 'lvl-drc-p4', name: 'Grade 4', subjects: drcUpperPrimarySubjects },
    { id: 'lvl-drc-p5', name: 'Grade 5', subjects: drcUpperPrimarySubjects },
    { id: 'lvl-drc-p6', name: 'Grade 6', subjects: drcUpperPrimarySubjects },
];

const drcLowerSecondarySubjects: Subject[] = [
    { id: 'sub-23', name: 'French' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-drc-7', name: 'Civic Education' }, { id: 'sub-drc-1', name: 'Local Language' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-drc-8', name: 'Arts' }, { id: 'sub-19', name: 'Physical Education' }
];

const drcLowerSecondaryLevels: Level[] = [
    { id: 'lvl-drc-s7', name: 'Grade 7', subjects: drcLowerSecondarySubjects },
    { id: 'lvl-drc-s8', name: 'Grade 8', subjects: drcLowerSecondarySubjects },
    { id: 'lvl-drc-s9', name: 'Grade 9', subjects: drcLowerSecondarySubjects },
    { id: 'lvl-drc-s10', name: 'Grade 10', subjects: drcLowerSecondarySubjects },
];

const drcUpperSecondaryStreams: Stream[] = [
    {
        id: 'stream-drc-sci', name: 'A. Science Stream (Scientifique)', subjects: [
            { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-22', name: 'ICT / Computer Studies (Optional)' }, { id: 'sub-23', name: 'French' }, { id: 'sub-15', name: 'English (Optional)' }, { id: 'sub-drc-7', name: 'Civic Education' }, { id: 'sub-drc-8', name: 'Arts & PE (Optional)' }
        ]
    },
    {
        id: 'stream-drc-hum', name: 'B. Humanities / Arts Stream (Lettres & Sciences Sociales)', subjects: [
            { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-drc-9', name: 'Philosophy / Ethics' }, { id: 'sub-drc-10', name: 'Literature (French / Local)' }, { id: 'sub-23', name: 'French' }, { id: 'sub-15', name: 'English (Optional)' }, { id: 'sub-drc-7', name: 'Civic Education' }, { id: 'sub-drc-8', name: 'Arts & PE (Optional)' }
        ]
    },
    {
        id: 'stream-drc-lang', name: 'C. Language Stream (Langues)', subjects: [
            { id: 'sub-23', name: 'French' }, { id: 'sub-15', name: 'English' }, { id: 'sub-drc-1', name: 'Local Languages' }, { id: 'sub-drc-10', name: 'Literature' }, { id: 'sub-drc-9', name: 'Philosophy / Ethics (Optional)' }, { id: 'sub-drc-7', name: 'Civic Education' }
        ]
    },
    {
        id: 'stream-drc-tvet', name: 'D. Technical / Vocational Stream (Filière Technique / Professionnelle)', subjects: [
            { id: 'sub-tvet-net', name: 'Information Technology', subjects: [{ id: 'sub-bi-19', name: 'Programming' }, { id: 'sub-bi-20', name: 'Networking' }, { id: 'sub-ke-11', name: 'Digital Literacy' }] },
            { id: 'sub-tvet-eng', name: 'Engineering', subjects: [{ id: 'sub-ke-13', name: 'Electrical' }, { id: 'sub-ke-12', name: 'Mechanical' }, { id: 'sub-tvet-civil', name: 'Civil' }, { id: 'sub-drc-11', name: 'Drafting' }] },
            { id: 'sub-tvet-agri', name: 'Agriculture', subjects: [{ id: 'sub-tvet-crop', name: 'Crop & Animal Science' }, { id: 'sub-ke-16', name: 'Agribusiness' }] },
            { id: 'sub-tvet-biz', name: 'Business & Commerce', subjects: [{ id: 'sub-bi-16', name: 'Accounting' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-29', name: 'Entrepreneurship' }] },
            { id: 'sub-tvet-health', name: 'Health Sciences', subjects: [{ id: 'sub-ke-19', name: 'Nursing' }, { id: 'sub-ug-12', name: 'Community Health' }] },
            { id: 'sub-tvet-hosp', name: 'Hospitality / Tourism', subjects: [{ id: 'sub-bi-28', name: 'Catering' }, { id: 'sub-tvet-hotel', name: 'Hotel Management' }] },
            { id: 'sub-tvet-arts', name: 'Fine & Applied Arts', subjects: [{ id: 'sub-18', name: 'Music' }, { id: 'sub-drc-12', name: 'Painting' }, { id: 'sub-tvet-tailor', name: 'Fashion' }, { id: 'sub-drc-13', name: 'Craft' }] },
        ]
    }
];

const drcUpperSecondaryLevels: Level[] = [
    { id: 'lvl-drc-s11', name: 'Grade 11', streams: drcUpperSecondaryStreams },
    { id: 'lvl-drc-s12', name: 'Grade 12', streams: drcUpperSecondaryStreams },
    { id: 'lvl-drc-s13', name: 'Grade 13', streams: drcUpperSecondaryStreams },
];


const cycles: Cycle[] = [
    { id: 'cycle-drc-1', name: 'Pre-Primary (Éducation Préscolaire)', curriculumId: 'cur-5', levels: drcPrePrimaryLevels },
    { id: 'cycle-drc-2', name: 'Primary Education (Enseignement Primaire)', curriculumId: 'cur-5', levels: drcPrimaryLevels },
    { id: 'cycle-drc-3', name: 'Lower Secondary (Cours Moyen & Secondaire)', curriculumId: 'cur-5', levels: drcLowerSecondaryLevels },
    { id: 'cycle-drc-4', name: 'Upper Secondary (Lycée)', curriculumId: 'cur-5', levels: drcUpperSecondaryLevels },
];

const levels: Level[] = [
    ...drcPrePrimaryLevels,
    ...drcPrimaryLevels,
    ...drcLowerSecondaryLevels,
    ...drcUpperSecondaryLevels,
];

export const drcCurriculum = {
    subjects,
    cycles,
    levels
};

    

    