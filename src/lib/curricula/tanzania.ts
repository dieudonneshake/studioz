
import { Level, Subject, Stream, Cycle } from '../types';

const subjects: Subject[] = [
  { id: 'sub-tz-1', name: 'Civics' },
  // Note: Kiswahili, English, Maths, etc. are likely already defined, but can be added here if specific versions are needed.
];

const tanzaniaPrePrimaryLevels: Level[] = [
    { id: 'lvl-tz-n1', name: 'Nursery 1', age: '3-4', subjects: [{ id: 'sub-7', name: 'Language (Kiswahili/English)' }, { id: 'sub-6', name: 'motor skills' }, { id: 'sub-9', name: 'social skills' }, { id: 'sub-6', name: 'songs & play' }] },
    { id: 'lvl-tz-n2', name: 'Nursery 2', age: '4-5', subjects: [{ id: 'sub-11', name: 'Early literacy' }, { id: 'sub-8', name: 'numeracy' }, { id: 'sub-ke-5', name: 'art & music' }, { id: 'sub-ke-1', name: 'environment' }, { id: 'sub-13', name: 'hygiene' }] },
    { id: 'lvl-tz-n3', name: 'Nursery 3', age: '5-6', subjects: [{ id: 'sub-5', name: 'Pre-reading' }, { id: 'sub-5', name: 'pre-writing' }, { id: 'sub-8', name: 'basic numeracy' }, { id: 'sub-13', name: 'moral education' }, { id: 'sub-24', name: 'creativity' }] },
];

const tanzaniaPrimarySubjects: Subject[] = [
    { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-ke-3', name: 'Science' }, { id: 'sub-ke-4', name: 'Social Studies' }, { id: 'sub-ug-7', name: 'Religious Education' }, { id: 'sub-24', name: 'Creative Arts' }, { id: 'sub-19', name: 'Physical Education' }, { id: 'sub-22', name: 'ICT (intro)' }
];

const tanzaniaPrimaryLevels: Level[] = [
    { id: 'lvl-tz-std1', name: 'Standard 1', subjects: tanzaniaPrimarySubjects.filter(s => s.id !== 'sub-22') },
    { id: 'lvl-tz-std2', name: 'Standard 2', subjects: tanzaniaPrimarySubjects.filter(s => s.id !== 'sub-22') },
    { id: 'lvl-tz-std3', name: 'Standard 3', subjects: tanzaniaPrimarySubjects.filter(s => s.id !== 'sub-22') },
    { id: 'lvl-tz-std4', name: 'Standard 4', subjects: tanzaniaPrimarySubjects },
    { id: 'lvl-tz-std5', name: 'Standard 5', subjects: tanzaniaPrimarySubjects },
    { id: 'lvl-tz-std6', name: 'Standard 6', subjects: tanzaniaPrimarySubjects },
    { id: 'lvl-tz-std7', name: 'Standard 7', subjects: tanzaniaPrimarySubjects },
];

const tanzaniaLowerSecondarySubjects: Subject[] = [
    { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-15', name: 'English' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-tz-1', name: 'Civics' }, { id: 'sub-ug-7', name: 'Religious Education' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-ug-8', name: 'Arts' }, { id: 'sub-19', name: 'Physical Education' }
];

const tanzaniaLowerSecondaryLevels: Level[] = [
    { id: 'lvl-tz-f1', name: 'Form 1', subjects: tanzaniaLowerSecondarySubjects },
    { id: 'lvl-tz-f2', name: 'Form 2', subjects: tanzaniaLowerSecondarySubjects },
    { id: 'lvl-tz-f3', name: 'Form 3', subjects: tanzaniaLowerSecondarySubjects },
    { id: 'lvl-tz-f4', name: 'Form 4', subjects: tanzaniaLowerSecondarySubjects },
];

const tanzaniaUpperSecondaryStreams: Stream[] = [
    {
        id: 'stream-tz-sci', name: 'A. Science Stream', subjects: [
            { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-28', name: 'Geography (Optional)' }, { id: 'sub-30', name: 'ICT / Computer Studies (Optional)' }, { id: 'sub-15', name: 'English' }, { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-ug-9', name: 'General Paper / Civics (Optional)' }
        ]
    },
    {
        id: 'stream-tz-hum', name: 'B. Humanities / Arts Stream', subjects: [
            { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-4', name: 'Literature (English / Kiswahili)' }, { id: 'sub-tz-1', name: 'Civics / Religious Studies (Optional)' }, { id: 'sub-15', name: 'English' }, { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-22', name: 'ICT (Optional)' }
        ]
    },
    {
        id: 'stream-tz-lang', name: 'C. Languages Stream', subjects: [
            { id: 'sub-15', name: 'English' }, { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-23', name: 'French / Arabic / Local Languages (Optional)' }, { id: 'sub-4', name: 'Literature' }, { id: 'sub-tz-1', name: 'Civics / Religious Studies (Optional)' }
        ]
    },
    {
        id: 'stream-tz-tvet', name: 'D. Technical / Vocational Stream (TVET)', subjects: [
            { id: 'sub-tvet-net', name: 'Information Technology', subjects: [{ id: 'sub-bi-19', name: 'Programming' }, { id: 'sub-bi-20', name: 'Networking' }, { id: 'sub-ug-10', name: 'Computer Applications' }] },
            { id: 'sub-tvet-eng', name: 'Engineering', subjects: [{ id: 'sub-ke-12', name: 'Mechanical' }, { id: 'sub-ke-13', name: 'Electrical' }, { id: 'sub-tvet-civil', name: 'Civil' }, { id: 'sub-ke-8', name: 'Technical Drawing' }] },
            { id: 'sub-tvet-agri', name: 'Agriculture', subjects: [{ id: 'sub-tvet-crop', name: 'Crop Production' }, { id: 'sub-tvet-animal', name: 'Animal Husbandry' }, { id: 'sub-ke-16', name: 'Agribusiness' }] },
            { id: 'sub-tvet-biz', name: 'Business & Commerce', subjects: [{ id: 'sub-bi-16', name: 'Accounting' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-29', name: 'Entrepreneurship' }] },
            { id: 'sub-tvet-hosp', name: 'Hospitality & Tourism', subjects: [{ id: 'sub-bi-28', name: 'Catering' }, { id: 'sub-tvet-hotel', name: 'Hotel Management' }, { id: 'sub-ke-17', name: 'Tourism' }] },
            { id: 'sub-tvet-health', name: 'Health Sciences', subjects: [{ id: 'sub-ke-19', name: 'Nursing' }, { id: 'sub-ug-12', name: 'Community Health' }, { id: 'sub-ke-20', name: 'First Aid' }] },
            { id: 'sub-tvet-arts', name: 'Fine & Applied Arts', subjects: [{ id: 'sub-18', name: 'Music' }, { id: 'sub-drc-12', name: 'Painting' }, { id: 'sub-tvet-tailor', name: 'Fashion' }, { id: 'sub-drc-13', name: 'Crafts' }] },
        ]
    }
];

const tanzaniaUpperSecondaryLevels: Level[] = [
    { id: 'lvl-tz-f5', name: 'Form 5', streams: tanzaniaUpperSecondaryStreams },
    { id: 'lvl-tz-f6', name: 'Form 6', streams: tanzaniaUpperSecondaryStreams },
];


const cycles: Cycle[] = [
    { id: 'cycle-tz-1', name: 'Pre-Primary Education', curriculumId: 'cur-6', levels: tanzaniaPrePrimaryLevels },
    { id: 'cycle-tz-2', name: 'Primary Education (Standards 1-7)', curriculumId: 'cur-6', levels: tanzaniaPrimaryLevels },
    { id: 'cycle-tz-3', name: 'Lower Secondary (Forms 1-4 / O-Level)', curriculumId: 'cur-6', levels: tanzaniaLowerSecondaryLevels },
    { id: 'cycle-tz-4', name: 'Upper Secondary (Forms 5-6 / A-Level)', curriculumId: 'cur-6', levels: tanzaniaUpperSecondaryLevels },
];

const levels: Level[] = [
    ...tanzaniaPrePrimaryLevels,
    ...tanzaniaPrimaryLevels,
    ...tanzaniaLowerSecondaryLevels,
    ...tanzaniaUpperSecondaryLevels,
];

export const tanzaniaCurriculum = {
    subjects,
    cycles,
    levels
};

    

    