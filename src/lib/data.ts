
import { User, Video, Curriculum, Level, Subject, Quiz, WatchHistory, Cycle, Stream } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? '';

export let users: User[] = [
  { id: 'user-1', name: 'Dr. Evelyn Reed', email: 'e.reed@example.com', role: 'teacher', status: 'approved', profile_photo: getImage('user-avatar-1'), bio: 'Passionate about making quantum physics accessible to everyone.' },
  { id: 'user-2', name: 'Mr. Samuel Chen', email: 's.chen@example.com', role: 'teacher', status: 'approved', profile_photo: getImage('user-avatar-2'), bio: 'Historian and educator focused on medieval Europe.' },
  { id: 'user-3', name: 'Alex Johnson', email: 'a.johnson@example.com', role: 'student', status: 'approved', profile_photo: getImage('user-avatar-3') },
  { id: 'user-4', name: 'Maria Garcia', email: 'm.garcia@example.com', role: 'teacher', status: 'pending', profile_photo: getImage('user-avatar-4'), subjects: ['Mathematics', 'Chemistry'], gradeLevels: ['Grade 9', 'Grade 10'] },
  { id: 'user-5', name: 'Admin User', email: 'admin@example.com', role: 'admin', status: 'approved', profile_photo: getImage('user-avatar-5') }
];

export let curricula: Curriculum[] = [
    { id: 'cur-1', name: 'Rwanda National Curriculum', description: 'The official curriculum for schools in Rwanda.' },
    { id: 'cur-2', name: 'Burundi National Curriculum', description: 'The official curriculum for schools in Burundi.' },
    { id: 'cur-3', name: 'Kenya National Curriculum', description: 'The official curriculum for schools in Kenya.' },
    { id: 'cur-4', name: 'Uganda National Curriculum', description: 'The official curriculum for schools in Uganda.' },
    { id: 'cur-5', name: 'DRC National Curriculum', description: 'The official curriculum for schools in the Democratic Republic of Congo.' },
    { id: 'cur-6', name: 'Tanzania National Curriculum', description: 'The official curriculum for schools in Tanzania.' },
    { id: 'cur-7', name: 'South Sudan National Curriculum', description: 'The official curriculum for schools in South Sudan.' },
    { id: 'cur-8', name: 'Nigeria National Curriculum', description: 'The official curriculum for schools in Nigeria.' },
    { id: 'cur-9', name: 'Cambridge International Curriculum', description: 'Globally recognized curriculum from Cambridge Assessment International Education.' }
];

export let subjects: Subject[] = [
  // General Subjects
  { id: 'sub-1', name: 'Physics' },
  { id: 'sub-2', name: 'History' },
  { id: 'sub-3', name: 'Mathematics' },
  { id: 'sub-4', name: 'Literature' },
  { id: 'sub-15', name: 'English' },
  { id: 'sub-25', name: 'Chemistry' },
  { id: 'sub-26', name: 'Biology' },
  { id: 'sub-28', name: 'Geography' },
  { id: 'sub-30', name: 'Computer Science' },
  { id: 'sub-31', name: 'Economics' },
  { id: 'sub-32', name: 'Political Science' },
  { id: 'sub-14', name: 'Kinyarwanda' },
  { id: 'sub-23', name: 'French' },
  { id: 'sub-27', name: 'Kiswahili' },
  { id: 'sub-29', name: 'Entrepreneurship' },
  { id: 'sub-22', name: 'ICT' },
  
  // Nursery Subjects
  { id: 'sub-5', name: 'Pre-reading & pre-writing skills' },
  { id: 'sub-6', name: 'Songs, games, drawing, motor skills' },
  { id: 'sub-7', name: 'Oral language (Kinyarwanda)' },
  { id: 'sub-8', name: 'Counting' },
  { id: 'sub-9', name: 'Social behavior' },
  { id: 'sub-10', name: 'Art & play' },
  { id: 'sub-11', name: 'Early literacy (Kinyarwanda & English intro)' },
  { id: 'sub-12', name: 'Basic math' },
  { id: 'sub-13', name: 'Morals & hygiene' },

  // Primary Subjects
  { id: 'sub-16', name: 'Social & Religious Education (SRE)' },
  { id: 'sub-17', name: 'Science & Elementary Technology (SET)' },
  { id: 'sub-18', name: 'Creative Arts & Music' },
  { id: 'sub-19', name: 'Physical Education' },
  { id: 'sub-20', name: 'Science & Elementary Technology' },
  { id: 'sub-21', name: 'Social & Religious Studies' },
  { id: 'sub-24', name: 'Creative Arts' },

  // A-Level Combinations (as subjects)
  { id: 'sub-combo-pcb', name: 'PCB (Physics, Chemistry, Biology)' },
  { id: 'sub-combo-pcm', name: 'PCM (Physics, Chemistry, Mathematics)' },
  { id: 'sub-combo-mcb', name: 'MCB (Mathematics, Chemistry, Biology)' },
  { id: 'sub-combo-mpc', name: 'MPC (Mathematics, Physics, Computer Science)' },
  { id: 'sub-combo-mpg', name: 'MPG (Mathematics, Physics, Geography)' },
  { id: 'sub-combo-bcm', name: 'BCM (Biology, Chemistry, Mathematics)' },
  { id: 'sub-combo-heg', name: 'HEG (History, Economics, Geography)' },
  { id: 'sub-combo-hel', name: 'HEL (History, Economics, Literature)' },
  { id: 'sub-combo-hgl', name: 'HGL (History, Geography, Literature)' },
  { id: 'sub-combo-heps', name: 'HEPS (History, Economics, Political Science)' },
  { id: 'sub-combo-hek', name: 'HEK (History, Economics, Kiswahili)' },
  { id: 'sub-combo-klf', name: 'KLF (Kinyarwanda, Literature, French)' },
  { id: 'sub-combo-elf', name: 'ELF (English, Literature, French)' },
  { id: 'sub-combo-kle', name: 'KLE (Kinyarwanda, Literature, English)' },
  { id: 'sub-combo-gel', name: 'GEL (Geography, Economics, Literature)' },

  // TTC Specializations (as subjects)
  { id: 'sub-ttc-lang', name: 'Education in Languages' },
  { id: 'sub-ttc-sci', name: 'Education in Mathematics & Science' },
  { id: 'sub-ttc-social', name: 'Education in Social Studies' },
  { id: 'sub-ttc-ecd', name: 'Early Childhood Development (ECD)' },
  { id: 'sub-ttc-sne', name: 'Inclusive & Special Needs Education' },

  // TVET Trades (as subjects)
  { id: 'sub-tvet-soft', name: 'Software Development' },
  { id: 'sub-tvet-net', name: 'Networking' },
  { id: 'sub-tvet-mason', name: 'Masonry' },
  { id: 'sub-tvet-plumb', name: 'Plumbing' },
  { id: 'sub-tvet-civil', name: 'Civil Engineering' },
  { id: 'sub-tvet-culinary', name: 'Culinary Arts' },
  { id: 'sub-tvet-hotel', name: 'Hotel Management' },
  { id: 'sub-tvet-crop', name: 'Crop Production' },
  { id: 'sub-tvet-animal', name: 'Animal Production' },
  { id: 'sub-tvet-agro', name: 'Agro-processing' },
  { id: 'sub-tvet-elec', name: 'Electrical Installation' },
  { id: 'sub-tvet-repair', name: 'Electronics Repair' },
  { id: 'sub-tvet-weld', name: 'Welding' },
  { id: 'sub-tvet-mech', name: 'Motor Vehicle Mechanics' },
  { id: 'sub-tvet-tailor', name: 'Tailoring' },
  { id: 'sub-tvet-garment', name: 'Garment Technology' },
  { id: 'sub-tvet-finance', name: 'Finance' },
  { id: 'sub-tvet-coop', name: 'Cooperative Management' },
  { id: 'sub-tvet-cosmo', name: 'Cosmetology' },
  { id: 'sub-tvet-media', name: 'Creative Arts / Media Production' },
];

const rwanNurseryLevels: Level[] = [
    { id: 'lvl-n1', name: 'Nursery 1 (Baby Class)', age: '3-4 yrs', subjects: [{id: 'sub-5', name: 'Pre-reading & pre-writing skills'}, {id: 'sub-6', name: 'Songs, games, drawing, motor skills'}] },
    { id: 'lvl-n2', name: 'Nursery 2 (Middle Class)', age: '4-5 yrs', subjects: [{id: 'sub-7', name: 'Oral language (Kinyarwanda)'}, {id: 'sub-8', name: 'Counting'}, {id: 'sub-9', name: 'Social behavior'}, {id: 'sub-10', name: 'Art & play'}] },
    { id: 'lvl-n3', name: 'Nursery 3 (Top Class)', age: '5-6 yrs', subjects: [{id: 'sub-11', name: 'Early literacy (Kinyarwanda & English intro)'}, {id: 'sub-12', name: 'Basic math'}, {id: 'sub-13', name: 'Morals & hygiene'}] },
];

const rwanPrimaryLowerLevels: Level[] = [
    { id: 'lvl-p1', name: 'P1', subjects: [{id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-15', name: 'English'}, {id: 'sub-3', name: 'Mathematics'}, {id: 'sub-16', name: 'Social & Religious Education (SRE)'}, {id: 'sub-17', name: 'Science & Elementary Technology (SET)'}, {id: 'sub-18', name: 'Creative Arts & Music'}, {id: 'sub-19', name: 'Physical Education'}] },
    { id: 'lvl-p2', name: 'P2', subjects: [{id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-15', name: 'English'}, {id: 'sub-3', name: 'Mathematics'}, {id: 'sub-16', name: 'Social & Religious Education (SRE)'}, {id: 'sub-17', name: 'Science & Elementary Technology (SET)'}, {id: 'sub-18', name: 'Creative Arts & Music'}, {id: 'sub-19', name: 'Physical Education'}] },
    { id: 'lvl-p3', name: 'P3', subjects: [{id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-15', name: 'English'}, {id: 'sub-3', name: 'Mathematics'}, {id: 'sub-16', name: 'Social & Religious Education (SRE)'}, {id: 'sub-17', name: 'Science & Elementary Technology (SET)'}, {id: 'sub-18', name: 'Creative Arts & Music'}, {id: 'sub-19', name: 'Physical Education'}] },
];
const rwanPrimaryUpperLevels: Level[] = [
    { id: 'lvl-p4', name: 'P4', subjects: [{id: 'sub-15', name: 'English'}, {id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-3', name: 'Mathematics'}, {id: 'sub-20', name: 'Science & Elementary Technology'}, {id: 'sub-21', name: 'Social & Religious Studies'}, {id: 'sub-22', name: 'ICT (basic)'}, {id: 'sub-23', name: 'French (optional)'}, {id: 'sub-24', name: 'Creative Arts'}, {id: 'sub-19', name: 'Physical Education'}] },
    { id: 'lvl-p5', name: 'P5', subjects: [{id: 'sub-15', name: 'English'}, {id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-3', name: 'Mathematics'}, {id: 'sub-20', name: 'Science & Elementary Technology'}, {id: 'sub-21', name: 'Social & Religious Studies'}, {id: 'sub-22', name: 'ICT (basic)'}, {id: 'sub-23', name: 'French (optional)'}, {id: 'sub-24', name: 'Creative Arts'}, {id: 'sub-19', name: 'Physical Education'}] },
    { id: 'lvl-p6', name: 'P6', subjects: [{id: 'sub-15', name: 'English'}, {id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-3', name: 'Mathematics'}, {id: 'sub-20', name: 'Science & Elementary Technology'}, {id: 'sub-21', name: 'Social & Religious Studies'}, {id: 'sub-22', name: 'ICT (basic)'}, {id: 'sub-23', name: 'French (optional)'}, {id: 'sub-24', name: 'Creative Arts'}, {id: 'sub-19', name: 'Physical Education'}] },
];

const rwanOLevelSubjects: Subject[] = [{id: 'sub-3', name: 'Mathematics'}, {id: 'sub-1', name: 'Physics'}, {id: 'sub-25', name: 'Chemistry'}, {id: 'sub-26', name: 'Biology'}, {id: 'sub-15', name: 'English'}, {id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-23', name: 'French'}, {id: 'sub-27', name: 'Kiswahili'}, {id: 'sub-2', name: 'History'}, {id: 'sub-28', name: 'Geography'}, {id: 'sub-29', name: 'Entrepreneurship'}, {id: 'sub-22', name: 'ICT'}, {id: 'sub-21', name: 'Religious Education (optional)'}, {id: 'sub-19', name: 'Physical Education'}];

const rwanOLevels: Level[] = [
    { id: 'lvl-s1', name: 'S1', subjects: rwanOLevelSubjects },
    { id: 'lvl-s2', name: 'S2', subjects: rwanOLevelSubjects },
    { id: 'lvl-s3', name: 'S3', subjects: rwanOLevelSubjects },
];

const rwanALevelStreams: Stream[] = [
    {id: 'stream-gen-ed', name: 'General Education (Academic Pathway)', 
        subjects: [
            {id: 'sub-stream-sci', name: 'Science Combinations', subjects: [{id: 'sub-combo-pcb', name: 'PCB (Physics, Chemistry, Biology)'}, {id: 'sub-combo-pcm', name: 'PCM (Physics, Chemistry, Mathematics)'}, {id: 'sub-combo-mcb', name: 'MCB (Mathematics, Chemistry, Biology)'}, {id: 'sub-combo-mpc', name: 'MPC (Mathematics, Physics, Computer Science)'}, {id: 'sub-combo-mpg', name: 'MPG (Mathematics, Physics, Geography)'}, {id: 'sub-combo-bcm', name: 'BCM (Biology, Chemistry, Mathematics)'}]},
            {id: 'sub-stream-arts', name: 'Arts & Humanities Combinations', subjects: [{id: 'sub-combo-heg', name: 'HEG (History, Economics, Geography)'}, {id: 'sub-combo-hel', name: 'HEL (History, Economics, Literature)'}, {id: 'sub-combo-hgl', name: 'HGL (History, Geography, Literature)'}, {id: 'sub-combo-heps', name: 'HEPS (History, Economics, Political Science)'}, {id: 'sub-combo-hek', name: 'HEK (History, Economics, Kiswahili)'}]},
            {id: 'sub-stream-lang', name: 'Languages / Social Sciences', subjects: [{id: 'sub-combo-klf', name: 'KLF (Kinyarwanda, Literature, French)'}, {id: 'sub-combo-elf', name: 'ELF (English, Literature, French)'}, {id: 'sub-combo-kle', name: 'KLE (Kinyarwanda, Literature, English)'}, {id: 'sub-combo-gel', name: 'GEL (Geography, Economics, Literature)'}]},
        ]
    },
    {id: 'stream-ttc', name: 'TTC (Teacher Training College)', subjects: [{id: 'sub-ttc-lang', name: 'Education in Languages'}, {id: 'sub-ttc-sci', name: 'Education in Mathematics & Science'}, {id: 'sub-ttc-social', name: 'Education in Social Studies'}, {id: 'sub-ttc-ecd', name: 'Early Childhood Development (ECD)'}, {id: 'sub-ttc-sne', name: 'Inclusive & Special Needs Education'}]},
    {id: 'stream-tvet', name: 'TVET (Technical & Vocational Education)', 
        subjects: [
            {id: 'sub-stream-ict', name: 'ICT', subjects: [{id: 'sub-tvet-soft', name: 'Software Development'}, {id: 'sub-tvet-net', name: 'Networking'}]},
            {id: 'sub-stream-construct', name: 'Construction', subjects: [{id: 'sub-tvet-mason', name: 'Masonry'}, {id: 'sub-tvet-plumb', name: 'Plumbing'}, {id: 'sub-tvet-civil', name: 'Civil Engineering'}]},
            {id: 'sub-stream-hospitality', name: 'Hospitality & Tourism', subjects: [{id: 'sub-tvet-culinary', name: 'Culinary Arts'}, {id: 'sub-tvet-hotel', name: 'Hotel Management'}]},
            {id: 'sub-stream-agri', name: 'Agriculture', subjects: [{id: 'sub-tvet-crop', name: 'Crop Production'}, {id: 'sub-tvet-animal', name: 'Animal Production'}, {id: 'sub-tvet-agro', name: 'Agro-processing'}]},
            {id: 'sub-stream-elec', name: 'Electricity & Electronics', subjects: [{id: 'sub-tvet-elec', name: 'Electrical Installation'}, {id: 'sub-tvet-repair', name: 'Electronics Repair'}]},
            {id: 'sub-stream-mech', name: 'Mechanical Engineering', subjects: [{id: 'sub-tvet-weld', name: 'Welding'}, {id: 'sub-tvet-mech', name: 'Motor Vehicle Mechanics'}]},
            {id: 'sub-stream-fashion', name: 'Fashion & Design', subjects: [{id: 'sub-tvet-tailor', name: 'Tailoring'}, {id: 'sub-tvet-garment', name: 'Garment Technology'}]},
            {id: 'sub-stream-biz', name: 'Business & Accounting', subjects: [{id: 'sub-tvet-finance', name: 'Finance'}, {id: 'sub-tvet-coop', name: 'Cooperative Management'}]},
            {id: 'sub-stream-beauty', name: 'Beauty & Hairdressing', subjects: [{id: 'sub-tvet-cosmo', name: 'Cosmetology'}]},
            {id: 'sub-stream-media', name: 'Creative Arts / Media Production', subjects: [{id: 'sub-tvet-media', name: 'Creative Arts / Media Production'}]},
        ]
    },
];

const rwanALevels: Level[] = [
    { id: 'lvl-s4', name: 'S4', streams: rwanALevelStreams },
    { id: 'lvl-s5', name: 'S5', streams: rwanALevelStreams },
    { id: 'lvl-s6', name: 'S6', streams: rwanALevelStreams },
];

const rwanUniversityLevels: Level[] = [
    {
        id: 'lvl-u-cert', name: 'Certificate Programs', subjects: [
            { id: 'sub-u-cert-ict', name: 'Certificate in ICT' },
            { id: 'sub-u-cert-biz', name: 'Certificate in Business Communication' },
            { id: 'sub-u-cert-ent', name: 'Certificate in Entrepreneurship' },
            { id: 'sub-u-cert-lang', name: 'Certificate in Languages' },
            { id: 'sub-u-cert-comm', name: 'Certificate in Community Development' },
        ]
    },
    {
        id: 'lvl-u-dip', name: 'Diploma Programs', subjects: [
            { id: 'sub-u-dip-edu', name: 'Diploma in Education' },
            { id: 'sub-u-dip-nurse', name: 'Diploma in Nursing' },
            { id: 'sub-u-dip-ict', name: 'Diploma in ICT' },
            { id: 'sub-u-dip-acc', name: 'Diploma in Accounting' },
            { id: 'sub-u-dip-civil', name: 'Diploma in Civil Engineering (A1)' },
            { id: 'sub-u-dip-hosp', name: 'Diploma in Hospitality Management' },
        ]
    },
    {
        id: 'lvl-u-undergrad', name: 'Undergraduate Degrees (Bachelor’s)', subjects: [
            {
                id: 'sub-u-sbe', name: 'School of Business & Economics (SBE)', subjects: [
                    { id: 'sub-u-bba-acc', name: 'BBA – Accounting' },
                    { id: 'sub-u-bba-fin', name: 'BBA – Finance' },
                    { id: 'sub-u-bba-mkt', name: 'BBA – Marketing' },
                    { id: 'sub-u-bba-proc', name: 'BBA – Procurement & Logistics' },
                    { id: 'sub-u-becon', name: 'Bachelor of Economics' },
                    { id: 'sub-u-bpm', name: 'Bachelor of Project Management' },
                ]
            },
            {
                id: 'sub-u-sce', name: 'School of Computing & Engineering (SCE)', subjects: [
                    { id: 'sub-u-bsc-cs', name: 'BSc Computer Science' },
                    { id: 'sub-u-bsc-se', name: 'BSc Software Engineering' },
                    { id: 'sub-u-bsc-it', name: 'BSc Information Technology' },
                    { id: 'sub-u-bsc-ce', name: 'BSc Computer Engineering' },
                    { id: 'sub-u-bsc-ds', name: 'BSc Data Science' },
                    { id: 'sub-u-bsc-etc', name: 'BSc Electronics and Telecommunication Engineering' },
                    { id: 'sub-u-bsc-civil', name: 'BSc Civil Engineering' },
                    { id: 'sub-u-bsc-mech', name: 'BSc Mechanical Engineering' },
                    { id: 'sub-u-bsc-elec', name: 'BSc Electrical Engineering' },
                ]
            },
            {
                id: 'sub-u-soe', name: 'School of Education (SoE)', subjects: [
                    { id: 'sub-u-edu-mp', name: 'Mathematics – Physics' },
                    { id: 'sub-u-edu-mcs', name: 'Mathematics – Computer Science' },
                    { id: 'sub-u-edu-pc', name: 'Physics – Chemistry' },
                    { id: 'sub-u-edu-cb', name: 'Chemistry – Biology' },
                    { id: 'sub-u-edu-bg', name: 'Biology – Geography' },
                    { id: 'sub-u-edu-el', name: 'English – Literature' },
                    { id: 'sub-u-edu-ke', name: 'Kinyarwanda – English' },
                    { id: 'sub-u-edu-he', name: 'History – Economics' },
                    { id: 'sub-u-edu-ge', name: 'Geography – Economics' },
                    { id: 'sub-u-edu-ee', name: 'Entrepreneurship – Economics' },
                ]
            },
            {
                id: 'sub-u-shs', name: 'School of Health Sciences (SHS)', subjects: [
                    { id: 'sub-u-shs-nurse', name: 'Bachelor of Nursing' },
                    { id: 'sub-u-shs-ph', name: 'Bachelor of Public Health' },
                    { id: 'sub-u-shs-bls', name: 'Bachelor of Biomedical Laboratory Sciences' },
                    { id: 'sub-u-shs-pharm', name: 'Bachelor of Pharmacy' },
                    { id: 'sub-u-shs-mbbs', name: 'Bachelor of Medicine & Surgery (MBBS)' },
                ]
            },
            {
                id: 'sub-u-sass', name: 'School of Arts & Social Sciences (SASS)', subjects: [
                    { id: 'sub-u-sass-journo', name: 'Bachelor of Journalism' },
                    { id: 'sub-u-sass-mass', name: 'Bachelor of Mass Communication' },
                    { id: 'sub-u-sass-ir', name: 'Bachelor of International Relations' },
                    { id: 'sub-u-sass-ps', name: 'Bachelor of Political Science' },
                    { id: 'sub-u-sass-sw', name: 'Bachelor of Social Work' },
                    { id: 'sub-u-sass-psy', name: 'Bachelor of Psychology' },
                ]
            },
            { id: 'sub-u-sol', name: 'School of Law (SoL)', subjects: [{ id: 'sub-u-sol-llb', name: 'Bachelor of Laws (LLB)' }] },
            {
                id: 'sub-u-saes', name: 'School of Agriculture & Environmental Studies (SAES)', subjects: [
                    { id: 'sub-u-saes-agri', name: 'Bachelor of Agriculture' },
                    { id: 'sub-u-saes-agbiz', name: 'Bachelor of Agribusiness' },
                    { id: 'sub-u-saes-forest', name: 'Bachelor of Forestry' },
                    { id: 'sub-u-saes-env', name: 'Bachelor of Environmental Science' },
                ]
            },
        ]
    },
    {
        id: 'lvl-u-pgd', name: 'Postgraduate Diploma (PGD)', subjects: [
            { id: 'sub-u-pgd-edu', name: 'PGD in Education (PGDE)' },
            { id: 'sub-u-pgd-pm', name: 'PGD in Project Management' },
            { id: 'sub-u-pgd-me', name: 'PGD in Monitoring & Evaluation' },
        ]
    },
    {
        id: 'lvl-u-master', name: 'Master’s Degrees (MA / MSc / MBA)', subjects: [
            {
                id: 'sub-u-master-biz', name: 'Business & Management', subjects: [
                    { id: 'sub-u-master-mba', name: 'MBA (General)' },
                    { id: 'sub-u-master-msc-fin', name: 'MSc in Finance' },
                    { id: 'sub-u-master-msc-acc', name: 'MSc in Accounting' },
                    { id: 'sub-u-master-msc-econ', name: 'MSc in Economics' },
                    { id: 'sub-u-master-proc', name: 'Master of Procurement & Logistics' },
                ]
            },
            {
                id: 'sub-u-master-tech', name: 'Technology & Engineering', subjects: [
                    { id: 'sub-u-master-msc-cs', name: 'MSc in Computer Science' },
                    { id: 'sub-u-master-msc-is', name: 'MSc in Information Systems' },
                    { id: 'sub-u-master-msc-tele', name: 'MSc in Telecommunications Engineering' },
                ]
            },
            {
                id: 'sub-u-master-edu', name: 'Education', subjects: [
                    { id: 'sub-u-master-med', name: 'Master of Education (MEd)' },
                    { id: 'sub-u-master-med-ci', name: 'MEd in Curriculum & Instruction' },
                    { id: 'sub-u-master-med-la', name: 'MEd in Leadership & Administration' },
                ]
            },
            {
                id: 'sub-u-master-health', name: 'Health Sciences', subjects: [
                    { id: 'sub-u-master-mph', name: 'Master of Public Health (MPH)' },
                    { id: 'sub-u-master-msc-nurse', name: 'MSc Nursing' },
                    { id: 'sub-u-master-msc-bls', name: 'MSc Biomedical Laboratory Science' },
                ]
            },
            {
                id: 'sub-u-master-social', name: 'Social Sciences & Law', subjects: [
                    { id: 'sub-u-master-ir', name: 'Master in International Relations' },
                    { id: 'sub-u-master-ds', name: 'Master in Development Studies' },
                    { id: 'sub-u-master-cj', name: 'Master in Criminal Justice' },
                    { id: 'sub-u-master-llm', name: 'LLM (Master of Laws)' },
                ]
            },
        ]
    },
    {
        id: 'lvl-u-phd', name: 'Doctorate Programs (PhD)', subjects: [
            { id: 'sub-u-phd-edu', name: 'PhD in Education' },
            { id: 'sub-u-phd-cs', name: 'PhD in Computer Science' },
            { id: 'sub-u-phd-ba', name: 'PhD in Business Administration' },
            { id: 'sub-u-phd-ph', name: 'PhD in Public Health' },
            { id: 'sub-u-phd-eng', name: 'PhD in Engineering' },
            { id: 'sub-u-phd-ss', name: 'PhD in Social Sciences' },
            { id: 'sub-u-phd-law', name: 'PhD in Law' },
        ]
    },
];

export let cycles: Cycle[] = [
    { id: 'cycle-rwa-1', name: 'Pre-Primary (Nursery)', curriculumId: 'cur-1', levels: rwanNurseryLevels },
    { id: 'cycle-rwa-2-lower', name: 'Lower Primary (P1 - P3)', curriculumId: 'cur-1', levels: rwanPrimaryLowerLevels },
    { id: 'cycle-rwa-2-upper', name: 'Upper Primary (P4 - P6)', curriculumId: 'cur-1', levels: rwanPrimaryUpperLevels },
    { id: 'cycle-rwa-3', name: 'Ordinary Level (O-Level)', curriculumId: 'cur-1', levels: rwanOLevels },
    { id: 'cycle-rwa-4', name: 'Advanced Level (A-Level)', curriculumId: 'cur-1', levels: rwanALevels },
    { id: 'cycle-rwa-5', name: 'University', curriculumId: 'cur-1', levels: rwanUniversityLevels },

    // Placeholder for other curricula
    { id: 'cycle-generic-1', name: 'Secondary', curriculumId: 'cur-9', levels: [ {id: 'lvl-g1', name: 'Grade 10', subjects: [{id:'sub-1', name: 'Physics'}] }, {id: 'lvl-g2', name: 'Grade 11', subjects: [{id:'sub-2', name: 'History'}] } ] },
    { id: 'cycle-generic-2', name: 'University', curriculumId: 'cur-9', levels: [ {id: 'lvl-u1', name: 'Year 1', subjects: [{id:'sub-3', name: 'Mathematics'}] } ] }
];

export let levels: Level[] = [...rwanNurseryLevels, ...rwanPrimaryLowerLevels, ...rwanPrimaryUpperLevels, ...rwanOLevels, ...rwanALevels, ...rwanUniversityLevels];

// Functions to add new items to the mock data
// In a real app, these would be API calls to your backend.
export async function addCurriculum(curriculum: Omit<Curriculum, 'id'>): Promise<Curriculum> {
  const newCurriculum = { ...curriculum, id: `cur-${Date.now()}` };
  curricula.push(newCurriculum);
  console.log("Added curriculum:", newCurriculum);
  return newCurriculum;
}

export async function addLevel(level: Omit<Level, 'id'>): Promise<Level> {
  const newLevel = { ...level, id: `lvl-${Date.now()}` };
  levels.push(newLevel);
  console.log("Added level:", newLevel);
  return newLevel;
}

export async function addSubject(subject: Omit<Subject, 'id'>): Promise<Subject> {
  const newSubject = { ...subject, id: `sub-${Date.now()}` };
  subjects.push(newSubject);
  console.log("Added subject:", newSubject);
  return newSubject;
}


export const videos: Video[] = [
  {
    id: 'vid-1',
    title: 'Introduction to Quantum Mechanics',
    description: 'A beginner-friendly introduction to the core concepts of quantum mechanics, including wave-particle duality and the uncertainty principle.',
    shortSummary: 'Learn the strange and fascinating rules of the quantum world.',
    uploaded_by: 'user-1',
    thumbnail_path: getImage('thumbnail-1'),
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration_seconds: 932,
    views_count: 12500,
    created_at: '2024-05-01T10:00:00Z',
    curriculum: 'IB',
    level: 'Diploma Year 1',
    subject: 'Physics',
    unit: 'Unit 1: Foundations',
  },
  {
    id: 'vid-2',
    title: 'The Norman Conquest of England (1066)',
    description: 'An in-depth look at the events leading up to the Battle of Hastings and its aftermath, shaping the future of England.',
    shortSummary: 'Discover how a single battle in 1066 changed England forever.',
    uploaded_by: 'user-2',
    thumbnail_path: getImage('thumbnail-2'),
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration_seconds: 1420,
    views_count: 23000,
    created_at: '2024-04-28T14:30:00Z',
    curriculum: 'A-Levels',
    level: 'Year 12',
    subject: 'History',
    unit: 'Unit 2: Medieval Britain',
  },
  {
    id: 'vid-3',
    title: 'Calculus Fundamentals: Limits and Derivatives',
    description: 'Master the foundational concepts of calculus. This lesson covers limits, continuity, and how to find derivatives from first principles.',
    shortSummary: 'Get a solid start in calculus by understanding limits and derivatives.',
    uploaded_by: 'user-1',
    thumbnail_path: getImage('thumbnail-3'),
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration_seconds: 1854,
    views_count: 8400,
    created_at: '2024-05-10T09:00:00Z',
    curriculum: 'IB',
    level: 'Diploma Year 1',
    subject: 'Mathematics',
    unit: 'Unit 3: Calculus',
  },
  {
    id: 'vid-4',
    title: 'Shakespeare\'s "Hamlet": Character Analysis',
    description: 'A deep dive into the complex character of Hamlet, exploring his motivations, madness, and tragic flaw.',
    shortSummary: 'Unpack the mind of one of literature\'s most iconic characters.',
    uploaded_by: 'user-2',
    thumbnail_path: getImage('thumbnail-4'),
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    duration_seconds: 1105,
    views_count: 15200,
    created_at: '2024-05-05T11:45:00Z',
    curriculum: 'A-Levels',
    level: 'Year 12',
    subject: 'Literature',
    unit: 'Unit 1: Shakespearean Tragedy',
  },
  {
    id: 'vid-5',
    title: 'Special Relativity and Time Dilation',
    description: 'Explore one of Einstein\'s most famous theories. Understand how time can pass differently for different observers.',
    shortSummary: 'Learn how time isn\'t as constant as you might think.',
    uploaded_by: 'user-1',
    thumbnail_path: getImage('thumbnail-5'),
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration_seconds: 1050,
    views_count: 9800,
    created_at: '2024-05-12T16:00:00Z',
    curriculum: 'IB',
    level: 'Diploma Year 1',
    subject: 'Physics',
    unit: 'Unit 2: Spacetime',
  },
  {
    id: 'vid-6',
    title: 'The Renaissance: Art and Culture Reborn',
    description: 'Journey back to 14th-century Italy and witness the rebirth of art, science, and literature that defined the Renaissance.',
    shortSummary: 'Explore the explosion of creativity that was the Renaissance.',
    uploaded_by: 'user-2',
    thumbnail_path: getImage('thumbnail-6'),
    video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    duration_seconds: 2200,
    views_count: 19500,
    created_at: '2024-05-08T18:00:00Z',
    curriculum: 'A-Levels',
    level: 'Year 12',
    subject: 'History',
    unit: 'Unit 3: Early Modern Europe',
  },
];

export const quizzes: Quiz[] = [
  {
    id: 'quiz-1',
    video_id: 'vid-1',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the principle that states a particle can exhibit properties of both waves and particles?',
        options: ['Uncertainty Principle', 'Wave-particle Duality', 'Quantum Entanglement', 'Superposition'],
        correct_answer: 'Wave-particle Duality',
        explanation: 'Wave-particle duality is the concept in quantum mechanics that every particle or quantum entity may be described as either a particle or a wave.',
      },
      {
        id: 'q2',
        type: 'true_false',
        prompt: 'The Heisenberg Uncertainty Principle states that we can know both the exact position and exact momentum of a particle at the same time.',
        correct_answer: 'False',
        explanation: 'The principle states the more precisely the position of some particle is determined, the less precisely its momentum can be known, and vice versa.',
      },
      {
        id: 'q3',
        type: 'short_answer',
        prompt: 'What is the term for a quantum of the electromagnetic field, including light?',
        correct_answer: 'Photon',
        explanation: 'A photon is the elementary particle responsible for electromagnetic phenomena. It is the basic unit of light and all other forms of electromagnetic radiation.',
      },
    ],
  },
  {
    id: 'quiz-2',
    video_id: 'vid-2',
    questions: [
        {
            "id": "q-norman-1",
            "type": "multiple_choice",
            "prompt": "Who was the king of England who died in 1066, leading to the succession crisis?",
            "options": [
                "Harold Godwinson",
                "William of Normandy",
                "Edward the Confessor",
                "Harald Hardrada"
            ],
            "correct_answer": "Edward the Confessor",
            "explanation": "Edward the Confessor's death in January 1066 without a clear heir triggered the succession crisis that led to the Norman Conquest."
        },
    ]
  }
];

export const summaries = {
  'vid-1': {
    en: 'This lesson introduces the foundational principles of quantum mechanics. It covers the concept of wave-particle duality, explaining how particles like electrons can behave as both particles and waves. The video also delves into the Heisenberg Uncertainty Principle, which posits a fundamental limit to the precision with which certain pairs of physical properties of a particle, such as position and momentum, can be known. Finally, it touches upon the idea of superposition, where a particle can exist in multiple states at once until measured.',
    fr: 'Cette leçon présente les principes fondamentaux de la mécanique quantique. Elle aborde le concept de dualité onde-particule, expliquant comment des particules comme les électrons peuvent se comporter à la fois comme des particules et des ondes. La vidéo explore également le principe d\'incertitude de Heisenberg, qui postule une limite fondamentale à la précision avec laquelle certaines paires de propriétés physiques d\'une particule, telles que la position et la quantité de mouvement, peuvent être connues. Enfin, elle aborde l\'idée de superposition, où une particule peut exister dans plusieurs états à la fois jusqu\'à ce qu\'elle soit mesurée.',
    notes: 'Lesson Notes: Introduction to Quantum Mechanics\n\n1.  Wave-Particle Duality\n    -   Light can act as a wave (diffraction, interference) and a particle (photoelectric effect).\n    -   De Broglie proposed that all matter has wave-like properties.\n    -   Electrons show wave properties in experiments like the double-slit experiment.\n\n2.  Heisenberg\'s Uncertainty Principle\n    -   It is impossible to simultaneously know the exact position and exact momentum (mass x velocity) of a particle.\n    -   The more accurately you know one, the less accurately you know the other.\n    -   Δx * Δp ≥ h/4π\n\n3.  Superposition\n    -   A quantum system can be in multiple states at the same time.\n    -   The act of measurement "collapses" the superposition into a single, definite state.\n    -   Schrödinger\'s cat is a famous thought experiment illustrating this concept.'
  },
};

export const watchHistory: WatchHistory[] = [
  { id: 'wh-1', student_id: 'user-3', video_id: 'vid-2', watched_at: '2024-05-20T10:00:00Z'},
  { id: 'wh-2', student_id: 'user-3', video_id: 'vid-4', watched_at: '2024-05-19T15:30:00Z'},
];

// These functions just retrieve data for the simulation.
// In a real app, they would be API calls.

export function getUploader(userId: string, allUsers: User[]): User | undefined {
  return allUsers.find(u => u.id === userId);
}

export function getVideo(videoId: string): Video | undefined {
  return videos.find(v => v.id === videoId);
}

export function getQuiz(videoId: string): Quiz | undefined {
  return quizzes.find(q => q.video_id === videoId);
}

export function getSummary(videoId: string) {
  return summaries[videoId as keyof typeof summaries];
}

    
