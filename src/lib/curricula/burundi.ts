
import { Level, Subject, Stream, Cycle } from '../types';

const subjects: Subject[] = [
  { id: 'sub-bi-1', name: 'Kirundi' },
  { id: 'sub-bi-2', name: 'Environmental Studies' },
  { id: 'sub-bi-3', name: 'Moral & Civic Education' },
  { id: 'sub-bi-4', name: 'Music & Art' },
  { id: 'sub-bi-5', name: 'Sciences & Technology' },
  { id: 'sub-bi-6', name: 'Social Studies' },
  { id: 'sub-bi-7', name: 'Civic Education' },
  { id: 'sub-bi-8', name: 'Technology' },
  { id: 'sub-bi-9', name: 'Home Economics' },
  { id: 'sub-bi-10', name: 'Arts' },
  { id: 'sub-bi-11', name: 'Philosophy' },
  { id: 'sub-bi-12', name: 'Research Project' },
  { id: 'sub-bi-13', name: 'Pedagogy' },
  { id: 'sub-bi-14', name: 'Psychology' },
  { id: 'sub-bi-15', name: 'Child Development' },
  { id: 'sub-bi-16', name: 'Accounting' },
  { id: 'sub-bi-17', name: 'Management' },
  { id: 'sub-bi-18', name: 'Finance' },
  { id: 'sub-bi-19', name: 'Programming' },
  { id: 'sub-bi-20', name: 'Networks' },
  { id: 'sub-bi-21', name: 'Operating Systems' },
  { id: 'sub-bi-22', name: 'Crop & Animal Science' },
  { id: 'sub-bi-23', name: 'Electrical Machines' },
  { id: 'sub-bi-24', name: 'Installation' },
  { id: 'sub-bi-25', name: 'Auto mechanics' },
  { id: 'sub-bi-26', name: 'Workshop practice' },
  { id: 'sub-bi-27', name: 'Hospitality' },
  { id: 'sub-bi-28', name: 'Catering' },
];

const burundiPrePrimaryLevels: Level[] = [
    { id: 'lvl-bi-n1', name: 'M1', age: '3-4', subjects: [{ id: 'sub-6', name: 'Psychomotor skills' }, { id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-12', name: 'early maths' }, { id: 'sub-13', name: 'hygiene' }, { id: 'sub-24', name: 'creative arts' }] },
    { id: 'lvl-bi-n2', name: 'M2', age: '4-5', subjects: [{ id: 'sub-7', name: 'Language development' }, { id: 'sub-8', name: 'numeracy' }, { id: 'sub-bi-4', name: 'Art' }, { id: 'sub-bi-2', name: 'environment' }] },
    { id: 'lvl-bi-n3', name: 'M3', age: '5-6', subjects: [{ id: 'sub-5', name: 'Pre-reading' }, { id: 'sub-5', name: 'pre-writing' }, { id: 'sub-8', name: 'numeracy' }, { id: 'sub-bi-3', name: 'social & moral education' }, { id: 'sub-bi-10', name: 'Arts' }] },
];

const burundiPrimaryLowerLevels: Level[] = [
    { id: 'lvl-bi-p1', name: 'Grade 1', subjects: [{ id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-bi-2', name: 'Environmental Studies' }, { id: 'sub-bi-3', name: 'Moral & Civic Education' }, { id: 'sub-23', name: 'French (intro)' }, { id: 'sub-bi-4', name: 'Music & Art' }, { id: 'sub-19', name: 'Physical Education' }] },
    { id: 'lvl-bi-p2', name: 'Grade 2', subjects: [{ id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-bi-2', name: 'Environmental Studies' }, { id: 'sub-bi-3', name: 'Moral & Civic Education' }, { id: 'sub-23', name: 'French' }, { id: 'sub-bi-4', name: 'Music & Art' }, { id: 'sub-19', name: 'Physical Education' }] },
    { id: 'lvl-bi-p3', name: 'Grade 3', subjects: [{ id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-bi-2', name: 'Environmental Studies' }, { id: 'sub-23', name: 'French' }, { id: 'sub-bi-3', name: 'Moral & Civic Education' }, { id: 'sub-bi-4', name: 'Music & Art' }, { id: 'sub-19', name: 'Physical Education' }] },
];

const burundiPrimaryUpperLevels: Level[] = [
    { id: 'lvl-bi-p4', name: 'Grade 4', subjects: [{ id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-23', name: 'French' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-bi-5', name: 'Sciences & Technology' }, { id: 'sub-bi-6', name: 'Social Studies' }, { id: 'sub-15', name: 'English (intro)' }, { id: 'sub-bi-3', name: 'Moral & Civic Education' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-19', name: 'PE, Music & Art' }] },
    { id: 'lvl-bi-p5', name: 'Grade 5', subjects: [{ id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-23', name: 'French' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-bi-5', name: 'Sciences & Technology' }, { id: 'sub-bi-6', name: 'Social Studies' }, { id: 'sub-15', name: 'English' }, { id: 'sub-bi-3', name: 'Moral & Civic Education' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-19', name: 'PE, Music & Art' }] },
    { id: 'lvl-bi-p6', name: 'Grade 6', subjects: [{ id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-23', name: 'French' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-bi-5', name: 'Sciences & Technology' }, { id: 'sub-bi-6', name: 'Social Studies' }, { id: 'sub-15', name: 'English' }, { id: 'sub-bi-3', name: 'Moral & Civic Education' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-19', name: 'PE, Music & Art' }] },
];

const burundiLowerSecondarySubjects: Subject[] = [
    { id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-23', name: 'French' }, { id: 'sub-15', name: 'English' }, { id: 'sub-27', name: 'Kiswahili' }, { id: 'sub-3', name: 'Mathematics' }, { id: 'sub-26', name: 'Biology' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-bi-7', name: 'Civic Education' }, { id: 'sub-22', name: 'ICT' }, { id: 'sub-bi-8', name: 'Technology' }, { id: 'sub-bi-9', name: 'Home Economics' }, { id: 'sub-bi-10', name: 'Arts' }, { id: 'sub-19', name: 'Physical Education' }
];

const burundiLowerSecondaryLevels: Level[] = [
    { id: 'lvl-bi-s7', name: 'Grade 7', subjects: burundiLowerSecondarySubjects },
    { id: 'lvl-bi-s8', name: 'Grade 8', subjects: burundiLowerSecondarySubjects },
    { id: 'lvl-bi-s9', name: 'Grade 9', subjects: burundiLowerSecondarySubjects },
    { id: 'lvl-bi-s10', name: 'Grade 10', subjects: burundiLowerSecondarySubjects },
];

const burundiUpperSecondaryStreams: Stream[] = [
    { id: 'stream-bi-gen', name: 'A. General Education Stream', subjects: [
        { id: 'sub-stream-bi-sci', name: 'Sciences', subjects: [{ id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }] },
        { id: 'sub-stream-bi-hum', name: 'Humanities', subjects: [{ id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-bi-11', name: 'Philosophy' }] },
        { id: 'sub-stream-bi-lang', name: 'Languages', subjects: [{ id: 'sub-23', name: 'French' }, { id: 'sub-15', name: 'English' }, { id: 'sub-bi-1', name: 'Kirundi' }, { id: 'sub-4', name: 'Literature' }] },
    ]},
    { id: 'stream-bi-tvet', name: 'B. Technical & Vocational Stream (A2 Technique)', subjects: [
        { id: 'sub-bi-tvet-ped', name: 'Pedagogy', subjects: [{ id: 'sub-bi-14', name: 'Psychology' }, { id: 'sub-bi-13', name: 'Pedagogy' }, { id: 'sub-bi-15', name: 'Child Development' }] },
        { id: 'sub-bi-tvet-acc', name: 'Accounting', subjects: [{ id: 'sub-bi-16', name: 'Accounting' }, { id: 'sub-bi-17', name: 'Management' }, { id: 'sub-bi-18', name: 'Finance' }] },
        { id: 'sub-bi-tvet-it', name: 'IT', subjects: [{ id: 'sub-bi-19', name: 'Programming' }, { id: 'sub-bi-20', name: 'Networks' }, { id: 'sub-bi-21', name: 'Operating Systems' }] },
        { id: 'sub-bi-tvet-agr', name: 'Agriculture', subjects: [{ id: 'sub-bi-22', name: 'Crop & Animal Science' }] },
        { id: 'sub-bi-tvet-elec', name: 'Electricity', subjects: [{ id: 'sub-bi-23', name: 'Electrical Machines' }, { id: 'sub-bi-24', name: 'Installation' }] },
        { id: 'sub-bi-tvet-mech', name: 'Mechanics', subjects: [{ id: 'sub-bi-25', name: 'Auto mechanics' }, { id: 'sub-bi-26', name: 'Workshop practice' }] },
        { id: 'sub-bi-tvet-hosp', name: 'Hotel & Tourism', subjects: [{ id: 'sub-bi-27', name: 'Hospitality' }, { id: 'sub-bi-28', name: 'Catering' }] },
    ]}
];

const burundiUpperSecondaryLevels: Level[] = [
    { id: 'lvl-bi-s11', name: 'Grade 11', streams: burundiUpperSecondaryStreams },
    { id: 'lvl-bi-s12', name: 'Grade 12', streams: burundiUpperSecondaryStreams },
    { id: 'lvl-bi-s13', name: 'Grade 13', streams: burundiUpperSecondaryStreams },
];

const cycles: Cycle[] = [
    { id: 'cycle-bi-1', name: 'Pre-Primary (École Maternelle)', curriculumId: 'cur-2', levels: burundiPrePrimaryLevels },
    { id: 'cycle-bi-2', name: 'Primary (Cycle 1 & 2)', curriculumId: 'cur-2', levels: [...burundiPrimaryLowerLevels, ...burundiPrimaryUpperLevels] },
    { id: 'cycle-bi-3', name: 'Lower Secondary (Cycle 3)', curriculumId: 'cur-2', levels: burundiLowerSecondaryLevels },
    { id: 'cycle-bi-4', name: 'Upper Secondary (A2)', curriculumId: 'cur-2', levels: burundiUpperSecondaryLevels },
];

const levels: Level[] = [
    ...burundiPrePrimaryLevels, 
    ...burundiPrimaryLowerLevels, 
    ...burundiPrimaryUpperLevels, 
    ...burundiLowerSecondaryLevels, 
    ...burundiUpperSecondaryLevels,
];

export const burundiCurriculum = {
    subjects,
    cycles,
    levels
};

