
import { Level, Subject, Stream, Cycle } from '../types';

const subjects: Subject[] = [
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
  
  // Nursery Subjects (Rwanda)
  { id: 'sub-5', name: 'Pre-reading & pre-writing skills' },
  { id: 'sub-6', name: 'Songs, games, drawing, motor skills' },
  { id: 'sub-7', name: 'Oral language (Kinyarwanda)' },
  { id: 'sub-8', name: 'Counting' },
  { id: 'sub-9', name: 'Social behavior' },
  { id: 'sub-10', name: 'Art & play' },
  { id: 'sub-11', name: 'Early literacy (Kinyarwanda & English intro)' },
  { id: 'sub-12', name: 'Basic math' },
  { id: 'sub-13', name: 'Morals & hygiene' },

  // Primary Subjects (Rwanda)
  { id: 'sub-16', name: 'Social & Religious Education (SRE)' },
  { id: 'sub-17', name: 'Science & Elementary Technology (SET)' },
  { id: 'sub-18', name: 'Creative Arts & Music' },
  { id: 'sub-19', name: 'Physical Education' },
  { id: 'sub-20', name: 'Science & Elementary Technology' },
  { id: 'sub-21', name: 'Social & Religious Studies' },
  { id: 'sub-24', name: 'Creative Arts' },

  // A-Level Combinations (as subjects)
  { id: 'sub-combo-pcb', name: 'PCB (Physics, Chemistry, Biology)', subjects: [{id: 'sub-1', name: 'Physics'}, {id: 'sub-25', name: 'Chemistry'}, {id: 'sub-26', name: 'Biology'}] },
  { id: 'sub-combo-pcm', name: 'PCM (Physics, Chemistry, Mathematics)', subjects: [{id: 'sub-1', name: 'Physics'}, {id: 'sub-25', name: 'Chemistry'}, {id: 'sub-3', name: 'Mathematics'}] },
  { id: 'sub-combo-mcb', name: 'MCB (Mathematics, Chemistry, Biology)', subjects: [{id: 'sub-3', name: 'Mathematics'}, {id: 'sub-25', name: 'Chemistry'}, {id: 'sub-26', name: 'Biology'}] },
  { id: 'sub-combo-mpc', name: 'MPC (Mathematics, Physics, Computer Science)', subjects: [{id: 'sub-3', name: 'Mathematics'}, {id: 'sub-1', name: 'Physics'}, {id: 'sub-30', name: 'Computer Science'}] },
  { id: 'sub-combo-mpg', name: 'MPG (Mathematics, Physics, Geography)', subjects: [{id: 'sub-3', name: 'Mathematics'}, {id: 'sub-1', name: 'Physics'}, {id: 'sub-28', name: 'Geography'}] },
  { id: 'sub-combo-bcm', name: 'BCM (Biology, Chemistry, Mathematics)', subjects: [{id: 'sub-26', name: 'Biology'}, {id: 'sub-25', name: 'Chemistry'}, {id: 'sub-3', name: 'Mathematics'}] },
  { id: 'sub-combo-heg', name: 'HEG (History, Economics, Geography)', subjects: [{id: 'sub-2', name: 'History'}, {id: 'sub-31', name: 'Economics'}, {id: 'sub-28', name: 'Geography'}] },
  { id: 'sub-combo-hel', name: 'HEL (History, Economics, Literature)', subjects: [{id: 'sub-2', name: 'History'}, {id: 'sub-31', name: 'Economics'}, {id: 'sub-4', name: 'Literature'}] },
  { id: 'sub-combo-hgl', name: 'HGL (History, Geography, Literature)', subjects: [{id: 'sub-2', name: 'History'}, {id: 'sub-28', name: 'Geography'}, {id: 'sub-4', name: 'Literature'}] },
  { id: 'sub-combo-heps', name: 'HEPS (History, Economics, Political Science)', subjects: [{id: 'sub-2', name: 'History'}, {id: 'sub-31', name: 'Economics'}, {id: 'sub-32', name: 'Political Science'}] },
  { id: 'sub-combo-hek', name: 'HEK (History, Economics, Kiswahili)', subjects: [{id: 'sub-2', name: 'History'}, {id: 'sub-31', name: 'Economics'}, {id: 'sub-27', name: 'Kiswahili'}] },
  { id: 'sub-combo-klf', name: 'KLF (Kinyarwanda, Literature, French)', subjects: [{id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-4', name: 'Literature'}, {id: 'sub-23', name: 'French'}] },
  { id: 'sub-combo-elf', name: 'ELF (English, Literature, French)', subjects: [{id: 'sub-15', name: 'English'}, {id: 'sub-4', name: 'Literature'}, {id: 'sub-23', name: 'French'}] },
  { id: 'sub-combo-kle', name: 'KLE (Kinyarwanda, Literature, English)', subjects: [{id: 'sub-14', name: 'Kinyarwanda'}, {id: 'sub-4', name: 'Literature'}, {id: 'sub-15', name: 'English'}] },
  { id: 'sub-combo-gel', name: 'GEL (Geography, Economics, Literature)', subjects: [{id: 'sub-28', name: 'Geography'}, {id: 'sub-31', name: 'Economics'}, {id: 'sub-4', name: 'Literature'}] },

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
  { id: 'sub-u-cert-ict', name: 'Certificate in ICT' },
  { id: 'sub-u-cert-biz', name: 'Certificate in Business Communication' },
  { id: 'sub-u-cert-ent', name: 'Certificate in Entrepreneurship' },
  { id: 'sub-u-cert-lang', name: 'Certificate in Languages' },
  { id: 'sub-u-cert-comm', name: 'Certificate in Community Development' },
  { id: 'sub-u-dip-edu', name: 'Diploma in Education' },
  { id: 'sub-u-dip-nurse', name: 'Diploma in Nursing' },
  { id: 'sub-u-dip-ict', name: 'Diploma in ICT' },
  { id: 'sub-u-dip-acc', name: 'Diploma in Accounting' },
  { id: 'sub-u-dip-civil', name: 'Diploma in Civil Engineering (A1)' },
  { id: 'sub-u-dip-hosp', name: 'Diploma in Hospitality Management' },
  { id: 'sub-u-bba-acc', name: 'BBA – Accounting' },
  { id: 'sub-u-bba-fin', name: 'BBA – Finance' },
  { id: 'sub-u-bba-mkt', name: 'BBA – Marketing' },
  { id: 'sub-u-bba-proc', name: 'BBA – Procurement & Logistics' },
  { id: 'sub-u-becon', name: 'Bachelor of Economics' },
  { id: 'sub-u-bpm', name: 'Bachelor of Project Management' },
  { id: 'sub-u-sbe', name: 'School of Business & Economics (SBE)', subjects: [{ id: 'sub-u-bba-acc', name: 'BBA – Accounting' }, { id: 'sub-u-bba-fin', name: 'BBA – Finance' }, { id: 'sub-u-bba-mkt', name: 'BBA – Marketing' }, { id: 'sub-u-bba-proc', name: 'BBA – Procurement & Logistics' }, { id: 'sub-u-becon', name: 'Bachelor of Economics' }, { id: 'sub-u-bpm', name: 'Bachelor of Project Management' }] },
  { id: 'sub-u-bsc-cs', name: 'BSc Computer Science' },
  { id: 'sub-u-bsc-se', name: 'BSc Software Engineering' },
  { id: 'sub-u-bsc-it', name: 'BSc Information Technology' },
  { id: 'sub-u-bsc-ce', name: 'BSc Computer Engineering' },
  { id: 'sub-u-bsc-ds', name: 'BSc Data Science' },
  { id: 'sub-u-bsc-etc', name: 'BSc Electronics and Telecommunication Engineering' },
  { id: 'sub-u-bsc-civil', name: 'BSc Civil Engineering' },
  { id: 'sub-u-bsc-mech', name: 'BSc Mechanical Engineering' },
  { id: 'sub-u-bsc-elec', name: 'BSc Electrical Engineering' },
  { id: 'sub-u-sce', name: 'School of Computing & Engineering (SCE)', subjects: [{ id: 'sub-u-bsc-cs', name: 'BSc Computer Science' }, { id: 'sub-u-bsc-se', name: 'BSc Software Engineering' }, { id: 'sub-u-bsc-it', name: 'BSc Information Technology' }, { id: 'sub-u-bsc-ce', name: 'BSc Computer Engineering' }, { id: 'sub-u-bsc-ds', name: 'BSc Data Science' }, { id: 'sub-u-bsc-etc', name: 'BSc Electronics and Telecommunication Engineering' }, { id: 'sub-u-bsc-civil', name: 'BSc Civil Engineering' }, { id: 'sub-u-bsc-mech', name: 'BSc Mechanical Engineering' }, { id: 'sub-u-bsc-elec', name: 'BSc Electrical Engineering' }] },
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
  { id: 'sub-u-soe', name: 'School of Education (SoE)', subjects: [{ id: 'sub-u-edu-mp', name: 'Mathematics – Physics' }, { id: 'sub-u-edu-mcs', name: 'Mathematics – Computer Science' }, { id: 'sub-u-edu-pc', name: 'Physics – Chemistry' }, { id: 'sub-u-edu-cb', name: 'Chemistry – Biology' }, { id: 'sub-u-edu-bg', name: 'Biology – Geography' }, { id: 'sub-u-edu-el', name: 'English – Literature' }, { id: 'sub-u-edu-ke', name: 'Kinyarwanda – English' }, { id: 'sub-u-edu-he', name: 'History – Economics' }, { id: 'sub-u-edu-ge', name: 'Geography – Economics' }, { id: 'sub-u-edu-ee', name: 'Entrepreneurship – Economics' }] },
  { id: 'sub-u-shs-nurse', name: 'Bachelor of Nursing' },
  { id: 'sub-u-shs-ph', name: 'Bachelor of Public Health' },
  { id: 'sub-u-shs-bls', name: 'Bachelor of Biomedical Laboratory Sciences' },
  { id: 'sub-u-shs-pharm', name: 'Bachelor of Pharmacy' },
  { id: 'sub-u-shs-mbbs', name: 'Bachelor of Medicine & Surgery (MBBS)' },
  { id: 'sub-u-shs', name: 'School of Health Sciences (SHS)', subjects: [{ id: 'sub-u-shs-nurse', name: 'Bachelor of Nursing' }, { id: 'sub-u-shs-ph', name: 'Bachelor of Public Health' }, { id: 'sub-u-shs-bls', name: 'Bachelor of Biomedical Laboratory Sciences' }, { id: 'sub-u-shs-pharm', name: 'Bachelor of Pharmacy' }, { id: 'sub-u-shs-mbbs', name: 'Bachelor of Medicine & Surgery (MBBS)' }] },
  { id: 'sub-u-sass-journo', name: 'Bachelor of Journalism' },
  { id: 'sub-u-sass-mass', name: 'Bachelor of Mass Communication' },
  { id: 'sub-u-sass-ir', name: 'Bachelor of International Relations' },
  { id: 'sub-u-sass-ps', name: 'Bachelor of Political Science' },
  { id: 'sub-u-sass-sw', name: 'Bachelor of Social Work' },
  { id: 'sub-u-sass-psy', name: 'Bachelor of Psychology' },
  { id: 'sub-u-sass', name: 'School of Arts & Social Sciences (SASS)', subjects: [{ id: 'sub-u-sass-journo', name: 'Bachelor of Journalism' }, { id: 'sub-u-sass-mass', name: 'Bachelor of Mass Communication' }, { id: 'sub-u-sass-ir', name: 'Bachelor of International Relations' }, { id: 'sub-u-sass-ps', name: 'Bachelor of Political Science' }, { id: 'sub-u-sass-sw', name: 'Bachelor of Social Work' }, { id: 'sub-u-sass-psy', name: 'Bachelor of Psychology' }] },
  { id: 'sub-u-sol-llb', name: 'Bachelor of Laws (LLB)' },
  { id: 'sub-u-sol', name: 'School of Law (SoL)', subjects: [{ id: 'sub-u-sol-llb', name: 'Bachelor of Laws (LLB)' }] },
  { id: 'sub-u-saes-agri', name: 'Bachelor of Agriculture' },
  { id: 'sub-u-saes-agbiz', name: 'Bachelor of Agribusiness' },
  { id: 'sub-u-saes-forest', name: 'Bachelor of Forestry' },
  { id: 'sub-u-saes-env', name: 'Bachelor of Environmental Science' },
  { id: 'sub-u-saes', name: 'School of Agriculture & Environmental Studies (SAES)', subjects: [{ id: 'sub-u-saes-agri', name: 'Bachelor of Agriculture' }, { id: 'sub-u-saes-agbiz', name: 'Bachelor of Agribusiness' }, { id: 'sub-u-saes-forest', name: 'Bachelor of Forestry' }, { id: 'sub-u-saes-env', name: 'Bachelor of Environmental Science' }] },
  { id: 'sub-u-pgd-edu', name: 'PGD in Education (PGDE)' },
  { id: 'sub-u-pgd-pm', name: 'PGD in Project Management' },
  { id: 'sub-u-pgd-me', name: 'PGD in Monitoring & Evaluation' },
  { id: 'sub-u-master-mba', name: 'MBA (General)' },
  { id: 'sub-u-master-msc-fin', name: 'MSc in Finance' },
  { id: 'sub-u-master-msc-acc', name: 'MSc in Accounting' },
  { id: 'sub-u-master-msc-econ', name: 'MSc in Economics' },
  { id: 'sub-u-master-proc', name: 'Master of Procurement & Logistics' },
  { id: 'sub-u-master-biz', name: 'Business & Management', subjects: [{ id: 'sub-u-master-mba', name: 'MBA (General)' }, { id: 'sub-u-master-msc-fin', name: 'MSc in Finance' }, { id: 'sub-u-master-msc-acc', name: 'MSc in Accounting' }, { id: 'sub-u-master-msc-econ', name: 'MSc in Economics' }, { id: 'sub-u-master-proc', name: 'Master of Procurement & Logistics' }] },
  { id: 'sub-u-master-msc-cs', name: 'MSc in Computer Science' },
  { id: 'sub-u-master-msc-is', name: 'MSc in Information Systems' },
  { id: 'sub-u-master-msc-tele', name: 'MSc in Telecommunications Engineering' },
  { id: 'sub-u-master-tech', name: 'Technology & Engineering', subjects: [{ id: 'sub-u-master-msc-cs', name: 'MSc in Computer Science' }, { id: 'sub-u-master-msc-is', name: 'MSc in Information Systems' }, { id: 'sub-u-master-msc-tele', name: 'MSc in Telecommunications Engineering' }] },
  { id: 'sub-u-master-med', name: 'Master of Education (MEd)' },
  { id: 'sub-u-master-med-ci', name: 'MEd in Curriculum & Instruction' },
  { id: 'sub-u-master-med-la', name: 'MEd in Leadership & Administration' },
  { id: 'sub-u-master-edu', name: 'Education', subjects: [{ id: 'sub-u-master-med', name: 'Master of Education (MEd)' }, { id: 'sub-u-master-med-ci', name: 'MEd in Curriculum & Instruction' }, { id: 'sub-u-master-med-la', name: 'MEd in Leadership & Administration' }] },
  { id: 'sub-u-master-mph', name: 'Master of Public Health (MPH)' },
  { id: 'sub-u-master-msc-nurse', name: 'MSc Nursing' },
  { id: 'sub-u-master-msc-bls', name: 'MSc Biomedical Laboratory Science' },
  { id: 'sub-u-master-health', name: 'Health Sciences', subjects: [{ id: 'sub-u-master-mph', name: 'Master of Public Health (MPH)' }, { id: 'sub-u-master-msc-nurse', name: 'MSc Nursing' }, { id: 'sub-u-master-msc-bls', name: 'MSc Biomedical Laboratory Science' }] },
  { id: 'sub-u-master-ir', name: 'Master in International Relations' },
  { id: 'sub-u-master-ds', name: 'Master in Development Studies' },
  { id: 'sub-u-master-cj', name: 'Master in Criminal Justice' },
  { id: 'sub-u-master-llm', name: 'LLM (Master of Laws)' },
  { id: 'sub-u-master-social', name: 'Social Sciences & Law', subjects: [{ id: 'sub-u-master-ir', name: 'Master in International Relations' }, { id: 'sub-u-master-ds', name: 'Master in Development Studies' }, { id: 'sub-u-master-cj', name: 'Master in Criminal Justice' }, { id: 'sub-u-master-llm', name: 'LLM (Master of Laws)' }] },
  { id: 'sub-u-phd-edu', name: 'PhD in Education' },
  { id: 'sub-u-phd-cs', name: 'PhD in Computer Science' },
  { id: 'sub-u-phd-ba', name: 'PhD in Business Administration' },
  { id: 'sub-u-phd-ph', name: 'PhD in Public Health' },
  { id: 'sub-u-phd-eng', name: 'PhD in Engineering' },
  { id: 'sub-u-phd-ss', name: 'PhD in Social Sciences' },
  { id: 'sub-u-phd-law', name: 'PhD in Law' },
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
    {
        id: 'stream-gen-ed', name: '1. GENERAL EDUCATION (Academic Pathway)',
        subjects: [
            { id: 'sub-stream-sci', name: 'Science Combinations', subjects: [{ id: 'sub-combo-pcb', name: 'PCB (Physics, Chemistry, Biology)', subjects: [{ id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }] }, { id: 'sub-combo-pcm', name: 'PCM (Physics, Chemistry, Mathematics)', subjects: [{ id: 'sub-1', name: 'Physics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-3', name: 'Mathematics' }] }, { id: 'sub-combo-mcb', name: 'MCB (Mathematics, Chemistry, Biology)', subjects: [{ id: 'sub-3', name: 'Mathematics' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-26', name: 'Biology' }] }, { id: 'sub-combo-mpc', name: 'MPC (Mathematics, Physics, Computer Science)', subjects: [{ id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-30', name: 'Computer Science' }] }, { id: 'sub-combo-mpg', name: 'MPG (Mathematics, Physics, Geography)', subjects: [{ id: 'sub-3', name: 'Mathematics' }, { id: 'sub-1', name: 'Physics' }, { id: 'sub-28', name: 'Geography' }] }, { id: 'sub-combo-bcm', name: 'BCM (Biology, Chemistry, Mathematics)', subjects: [{ id: 'sub-26', name: 'Biology' }, { id: 'sub-25', name: 'Chemistry' }, { id: 'sub-3', name: 'Mathematics' }] }] },
            { id: 'sub-stream-arts', name: 'Arts & Humanities Combinations', subjects: [{ id: 'sub-combo-heg', name: 'HEG (History, Economics, Geography)', subjects: [{ id: 'sub-2', name: 'History' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-28', name: 'Geography' }] }, { id: 'sub-combo-hel', name: 'HEL (History, Economics, Literature)', subjects: [{ id: 'sub-2', name: 'History' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-4', name: 'Literature' }] }, { id: 'sub-combo-hgl', name: 'HGL (History, Geography, Literature)', subjects: [{ id: 'sub-2', name: 'History' }, { id: 'sub-28', name: 'Geography' }, { id: 'sub-4', name: 'Literature' }] }, { id: 'sub-combo-heps', name: 'HEPS (History, Economics, Political Science)', subjects: [{ id: 'sub-2', name: 'History' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-32', name: 'Political Science' }] }, { id: 'sub-combo-hek', name: 'HEK (History, Economics, Kiswahili)', subjects: [{ id: 'sub-2', name: 'History' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-27', name: 'Kiswahili' }] }] },
            { id: 'sub-stream-lang', name: 'Languages / Social Sciences', subjects: [{ id: 'sub-combo-klf', name: 'KLF (Kinyarwanda, Literature, French)', subjects: [{ id: 'sub-14', name: 'Kinyarwanda' }, { id: 'sub-4', name: 'Literature' }, { id: 'sub-23', name: 'French' }] }, { id: 'sub-combo-elf', name: 'ELF (English, Literature, French)', subjects: [{ id: 'sub-15', name: 'English' }, { id: 'sub-4', name: 'Literature' }, { id: 'sub-23', name: 'French' }] }, { id: 'sub-combo-kle', name: 'KLE (Kinyarwanda, Literature, English)', subjects: [{ id: 'sub-14', name: 'Kinyarwanda' }, { id: 'sub-4', name: 'Literature' }, { id: 'sub-15', name: 'English' }] }, { id: 'sub-combo-gel', name: 'GEL (Geography, Economics, Literature)', subjects: [{ id: 'sub-28', name: 'Geography' }, { id: 'sub-31', name: 'Economics' }, { id: 'sub-4', name: 'Literature' }] }] },
        ]
    },
    {
        id: 'stream-ttc', name: '2. TTC (Teacher Training College)',
        subjects: [
            { id: 'sub-ttc-lang', name: 'Education in Languages' },
            { id: 'sub-ttc-sci', name: 'Education in Mathematics & Science' },
            { id: 'sub-ttc-social', name: 'Education in Social Studies' },
            { id: 'sub-ttc-ecd', name: 'Early Childhood Development (ECD)' },
            { id: 'sub-ttc-sne', name: 'Inclusive & Special Needs Education' },
        ]
    },
    {
        id: 'stream-tvet', name: '3. TVET (Technical & Vocational)',
        subjects: [
            { id: 'sub-stream-ict', name: 'ICT', subjects: [{ id: 'sub-tvet-soft', name: 'Software Development' }, { id: 'sub-tvet-net', name: 'Networking' }] },
            { id: 'sub-stream-construct', name: 'Construction', subjects: [{ id: 'sub-tvet-mason', name: 'Masonry' }, { id: 'sub-tvet-plumb', name: 'Plumbing' }, { id: 'sub-tvet-civil', name: 'Civil Engineering' }] },
            { id: 'sub-stream-hospitality', name: 'Hospitality & Tourism', subjects: [{ id: 'sub-tvet-culinary', name: 'Culinary Arts' }, { id: 'sub-tvet-hotel', name: 'Hotel Management' }] },
            { id: 'sub-stream-agri', name: 'Agriculture', subjects: [{ id: 'sub-tvet-crop', name: 'Crop Production' }, { id: 'sub-tvet-animal', name: 'Animal Production' }, { id: 'sub-tvet-agro', name: 'Agro-processing' }] },
            { id: 'sub-stream-elec', name: 'Electricity & Electronics', subjects: [{ id: 'sub-tvet-elec', name: 'Electrical Installation' }, { id: 'sub-tvet-repair', name: 'Electronics Repair' }] },
            { id: 'sub-stream-mech', name: 'Mechanical Engineering', subjects: [{ id: 'sub-tvet-weld', name: 'Welding' }, { id: 'sub-tvet-mech', name: 'Motor Vehicle Mechanics' }] },
            { id: 'sub-stream-fashion', name: 'Fashion & Design', subjects: [{ id: 'sub-tvet-tailor', name: 'Tailoring' }, { id: 'sub-tvet-garment', name: 'Garment Technology' }] },
            { id: 'sub-stream-biz', name: 'Business & Accounting', subjects: [{ id: 'sub-tvet-finance', name: 'Finance' }, { id: 'sub-tvet-coop', name: 'Cooperative Management' }] },
            { id: 'sub-stream-beauty', name: 'Beauty & Hairdressing', subjects: [{ id: 'sub-tvet-cosmo', name: 'Cosmetology' }] },
            { id: 'sub-stream-media', name: 'Creative Arts / Media Production', subjects: [{ id: 'sub-tvet-media', name: 'Creative Arts / Media Production' }] },
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
        id: 'lvl-u-cert', name: 'A. Certificate Programs', subjects: [
            { id: 'sub-u-cert-ict', name: 'Certificate in ICT' },
            { id: 'sub-u-cert-biz', name: 'Certificate in Business Communication' },
            { id: 'sub-u-cert-ent', name: 'Certificate in Entrepreneurship' },
            { id: 'sub-u-cert-lang', name: 'Certificate in Languages' },
            { id: 'sub-u-cert-comm', name: 'Certificate in Community Development' },
        ]
    },
    {
        id: 'lvl-u-dip', name: 'B. Diploma Programs', subjects: [
            { id: 'sub-u-dip-edu', name: 'Diploma in Education' },
            { id: 'sub-u-dip-nurse', name: 'Diploma in Nursing' },
            { id: 'sub-u-dip-ict', name: 'Diploma in ICT' },
            { id: 'sub-u-dip-acc', name: 'Diploma in Accounting' },
            { id: 'sub-u-dip-civil', name: 'Diploma in Civil Engineering (A1)' },
            { id: 'sub-u-dip-hosp', name: 'Diploma in Hospitality Management' },
        ]
    },
    {
        id: 'lvl-u-undergrad', name: 'C. Undergraduate Degrees (Bachelor’s)', subjects: [
            { id: 'sub-u-sbe', name: 'School of Business & Economics (SBE)', subjects: [{ id: 'sub-u-bba-acc', name: 'BBA – Accounting' }, { id: 'sub-u-bba-fin', name: 'BBA – Finance' }, { id: 'sub-u-bba-mkt', name: 'BBA – Marketing' }, { id: 'sub-u-bba-proc', name: 'BBA – Procurement & Logistics' }, { id: 'sub-u-becon', name: 'Bachelor of Economics' }, { id: 'sub-u-bpm', name: 'Bachelor of Project Management' }] },
            { id: 'sub-u-sce', name: 'School of Computing & Engineering (SCE)', subjects: [{ id: 'sub-u-bsc-cs', name: 'BSc Computer Science' }, { id: 'sub-u-bsc-se', name: 'BSc Software Engineering' }, { id: 'sub-u-bsc-it', name: 'BSc Information Technology' }, { id: 'sub-u-bsc-ce', name: 'BSc Computer Engineering' }, { id: 'sub-u-bsc-ds', name: 'BSc Data Science' }, { id: 'sub-u-bsc-etc', name: 'BSc Electronics and Telecommunication Engineering' }, { id: 'sub-u-bsc-civil', name: 'BSc Civil Engineering' }, { id: 'sub-u-bsc-mech', name: 'BSc Mechanical Engineering' }, { id: 'sub-u-bsc-elec', name: 'BSc Electrical Engineering' }] },
            { id: 'sub-u-soe', name: 'School of Education (SoE)', subjects: [{ id: 'sub-u-edu-mp', name: 'Mathematics – Physics' }, { id: 'sub-u-edu-mcs', name: 'Mathematics – Computer Science' }, { id: 'sub-u-edu-pc', name: 'Physics – Chemistry' }, { id: 'sub-u-edu-cb', name: 'Chemistry – Biology' }, { id: 'sub-u-edu-bg', name: 'Biology – Geography' }, { id: 'sub-u-edu-el', name: 'English – Literature' }, { id: 'sub-u-edu-ke', name: 'Kinyarwanda – English' }, { id: 'sub-u-edu-he', name: 'History – Economics' }, { id: 'sub-u-edu-ge', name: 'Geography – Economics' }, { id: 'sub-u-edu-ee', name: 'Entrepreneurship – Economics' }] },
            { id: 'sub-u-shs', name: 'School of Health Sciences (SHS)', subjects: [{ id: 'sub-u-shs-nurse', name: 'Bachelor of Nursing' }, { id: 'sub-u-shs-ph', name: 'Bachelor of Public Health' }, { id: 'sub-u-shs-bls', name: 'Bachelor of Biomedical Laboratory Sciences' }, { id: 'sub-u-shs-pharm', name: 'Bachelor of Pharmacy' }, { id: 'sub-u-shs-mbbs', name: 'Bachelor of Medicine & Surgery (MBBS)' }] },
            { id: 'sub-u-sass', name: 'School of Arts & Social Sciences (SASS)', subjects: [{ id: 'sub-u-sass-journo', name: 'Bachelor of Journalism' }, { id: 'sub-u-sass-mass', name: 'Bachelor of Mass Communication' }, { id: 'sub-u-sass-ir', name: 'Bachelor of International Relations' }, { id: 'sub-u-sass-ps', name: 'Bachelor of Political Science' }, { id: 'sub-u-sass-sw', name: 'Bachelor of Social Work' }, { id: 'sub-u-sass-psy', name: 'Bachelor of Psychology' }] },
            { id: 'sub-u-sol', name: 'School of Law (SoL)', subjects: [{ id: 'sub-u-sol-llb', name: 'Bachelor of Laws (LLB)' }] },
            { id: 'sub-u-saes', name: 'School of Agriculture & Environmental Studies (SAES)', subjects: [{ id: 'sub-u-saes-agri', name: 'Bachelor of Agriculture' }, { id: 'sub-u-saes-agbiz', name: 'Bachelor of Agribusiness' }, { id: 'sub-u-saes-forest', name: 'Bachelor of Forestry' }, { id: 'sub-u-saes-env', name: 'Bachelor of Environmental Science' }] },
        ]
    },
    {
        id: 'lvl-u-pgd', name: 'D. Postgraduate Diploma (PGD)', subjects: [
            { id: 'sub-u-pgd-edu', name: 'PGD in Education (PGDE)' },
            { id: 'sub-u-pgd-pm', name: 'PGD in Project Management' },
            { id: 'sub-u-pgd-me', name: 'PGD in Monitoring & Evaluation' },
        ]
    },
    {
        id: 'lvl-u-master', name: 'E. Master’s Degrees (MA / MSc / MBA)', subjects: [
            { id: 'sub-u-master-biz', name: 'Business & Management', subjects: [{ id: 'sub-u-master-mba', name: 'MBA (General)' }, { id: 'sub-u-master-msc-fin', name: 'MSc in Finance' }, { id: 'sub-u-master-msc-acc', name: 'MSc in Accounting' }, { id: 'sub-u-master-msc-econ', name: 'MSc in Economics' }, { id: 'sub-u-master-proc', name: 'Master of Procurement & Logistics' }] },
            { id: 'sub-u-master-tech', name: 'Technology & Engineering', subjects: [{ id: 'sub-u-master-msc-cs', name: 'MSc in Computer Science' }, { id: 'sub-u-master-msc-is', name: 'MSc in Information Systems' }, { id: 'sub-u-master-msc-tele', name: 'MSc in Telecommunications Engineering' }] },
            { id: 'sub-u-master-edu', name: 'Education', subjects: [{ id: 'sub-u-master-med', name: 'Master of Education (MEd)' }, { id: 'sub-u-master-med-ci', name: 'MEd in Curriculum & Instruction' }, { id: 'sub-u-master-med-la', name: 'MEd in Leadership & Administration' }] },
            { id: 'sub-u-master-health', name: 'Health Sciences', subjects: [{ id: 'sub-u-master-mph', name: 'Master of Public Health (MPH)' }, { id: 'sub-u-master-msc-nurse', name: 'MSc Nursing' }, { id: 'sub-u-master-msc-bls', name: 'MSc Biomedical Laboratory Science' }] },
            { id: 'sub-u-master-social', name: 'Social Sciences & Law', subjects: [{ id: 'sub-u-master-ir', name: 'Master in International Relations' }, { id: 'sub-u-master-ds', name: 'Master in Development Studies' }, { id: 'sub-u-master-cj', name: 'Master in Criminal Justice' }, { id: 'sub-u-master-llm', name: 'LLM (Master of Laws)' }] },
        ]
    },
    {
        id: 'lvl-u-phd', name: 'F. Doctorate Programs (PhD)', subjects: [
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

const cycles: Cycle[] = [
    { id: 'cycle-rwa-1', name: 'Pre-Primary (Nursery)', curriculumId: 'cur-1', levels: rwanNurseryLevels },
    { id: 'cycle-rwa-2-lower', name: 'Lower Primary (P1 - P3)', curriculumId: 'cur-1', levels: rwanPrimaryLowerLevels },
    { id: 'cycle-rwa-2-upper', name: 'Upper Primary (P4 - P6)', curriculumId: 'cur-1', levels: rwanPrimaryUpperLevels },
    { id: 'cycle-rwa-3', name: 'Ordinary Level (O-Level)', curriculumId: 'cur-1', levels: rwanOLevels },
    { id: 'cycle-rwa-4', name: 'Advanced Level (A-Level)', curriculumId: 'cur-1', levels: rwanALevels },
    { id: 'cycle-rwa-5', name: 'University', curriculumId: 'cur-1', levels: rwanUniversityLevels },
];

const levels: Level[] = [
    ...rwanNurseryLevels, ...rwanPrimaryLowerLevels, ...rwanPrimaryUpperLevels, ...rwanOLevels, ...rwanALevels, ...rwanUniversityLevels,
];

export const rwandaCurriculum = {
    subjects,
    cycles,
    levels
};

