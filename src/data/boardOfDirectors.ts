// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DirectorProfile {
  _id?: string;
  name: string;
  role: string;
  hash: string;
  image: any;
  bio: string;
  category?: "board" | "management";
}

export const BOARD_OF_DIRECTORS: DirectorProfile[] = [
  {
    name: "Santosh Kumar",
    role: "Director | Social Entrepreneur, RTI Champion & Former World Bank Consultant",
    hash: "dir-01",
    image: "/directors/santosh-kumar.jpg",
    category: "board",
    bio: "Santosh Kumar is a dynamic social entrepreneur, RTI activist, and rural development practitioner dedicated to advancing transparency, accountability, and sustainable livelihoods in India. He left a promising career in the IT and government sectors to work at the grassroots, empowering rural communities through innovative development initiatives. He first gained national recognition for his successful campaign under the Right to Information (RTI) Act, which led to greater transparency through the public disclosure of government officials' asset declarations.\n\nToday, Santosh is driving systemic change in Bihar through a two-pronged approach: strengthening public accountability by pursuing Public Interest Litigations (PILs) and developing scalable, low-cost rural livelihood models, including commercial goat farming, to promote entrepreneurship and generate sustainable employment.\n\nHis innovative rural development frameworks have been recognised by the Indian Council of Agricultural Research (ICAR) and recommended to the Ministry of Micro, Small and Medium Enterprises (MSME).\n\nAs a respected public policy voice and thought leader, Santosh is a regular columnist for national newspapers, a frequent panellist on television debates, and a sought-after speaker on governance, rural development, and transparency. His contributions have earned recognition from State Governors, academic institutions, and leading media organisations for their impact on public policy and grassroots development."
  },
  {
    name: "Arun Kumar Singh",
    role: "Former Deputy Comptroller & Auditor General of India | IA&AS",
    hash: "dir-02",
    image: "/directors/arun-kumar-singh.jpg",
    category: "board",
    bio: "Arun Kumar Singh is a distinguished retired officer of the Indian Audit and Accounts Service (IA&AS) with an exceptional career in public finance, government auditing, and institutional governance. After graduating in Physics from Patna Science College in 1976, he successfully cleared the Civil Services Examination in 1977 and joined the IA&AS in 1978.\n\nDuring his distinguished career, he served as Accountant General and Principal Accountant General across multiple states, leading audits of state government departments and strengthening financial accountability. He also held senior positions in New Delhi, overseeing audits of Public Sector Undertakings (PSUs) and Central Government ministries.\n\nHis final assignment was as Deputy Comptroller & Auditor General of India, where he supervised the preparation and finalization of audit reports relating to several important national programmes, including archaeological conservation, museums, the National Rural Health Mission, Rashtriya Krishi Vikas Yojana, Indira Awaas Yojana, urban renewal initiatives, and rural electrification programmes. His decades of experience in public administration and financial oversight provide invaluable guidance to the Nav Bihar Renaissance Foundation."
  },
  {
    name: "Gyan Mohan",
    role: "Senior Banking & Financial Services Professional",
    hash: "dir-03",
    image: "/directors/gyan-mohan.jpg",
    category: "board",
    bio: "Gyan Mohan is an accomplished banking and finance professional with more than four decades of leadership experience across commercial banking, investment banking, financial services, and microfinance. Throughout his career, he has served in senior management positions at the State Bank of India, SBI Capital Markets, IDBI Capital, Power Exchange India Limited, India Fortune Financial Services Limited, and SIS Limited.\n\nHe currently heads Adi Chitragupta Finance Limited (ACFL), the only RBI-registered NBFC-MFI headquartered in Bihar. Under his leadership, the institution has contributed significantly to expanding financial inclusion and access to credit.\n\nMr. Mohan also serves as a Director on the Governing Board of the Microfinance Institutions Network (MFIN), an RBI-accredited self-regulatory organisation. As Chairman of the Task Force on Small and Medium MFIs and an active member of the Credit Bureau Task Force and State Initiative Task Force, he continues to contribute to policy development and advocacy within India's microfinance sector."
  },
  {
    name: "Dr. Satyajit Kumar Singh",
    role: "Managing Director, Ruban Memorial Hospital | Senior Urologist",
    hash: "dir-04",
    image: "/directors/Dr.-Satyajit-Kumar-Singh.jpg",
    category: "board",
    bio: "Dr. Satyajit Kumar Singh is a renowned urologist and healthcare leader with more than thirty years of professional experience in urology and andrology. He serves as the Managing Director of Ruban Memorial Hospital, Patna, one of Bihar's leading healthcare institutions.\n\nAn alumnus of Patna Medical College Hospital (PMCH), Dr. Singh completed his postgraduate medical education before pursuing advanced training in the United Kingdom, where he established a successful private medical practice. He later served as a Consultant Urologist at an American hospital in Saudi Arabia before returning to Bihar in 1996.\n\nFollowing seventeen years of international medical practice, Dr. Singh returned to his home state with the vision of strengthening healthcare services by establishing Ruban Memorial Hospital. Throughout his career, he has remained committed to improving healthcare access and applying his expertise for the welfare of underserved communities across Bihar."
  },
  {
    name: "Prof. Nirmal Kumar",
    role: "Former Principal | Civil Engineer | Academic Administrator",
    hash: "dir-05",
    image: "/directors/Prof.-Nirmal-Kumar.jpg",
    category: "board",
    bio: "Prof. Nirmal Kumar is an eminent academician and engineering educator with extensive experience in higher education, institutional leadership, and civil engineering. A graduate of BIT Sindri with First Class Honours in Civil Engineering, he began his career by contributing to the establishment of Magadh Engineering College before joining the Muzaffarpur Institute of Technology through the Bihar Public Service Commission.\n\nHe later completed his M.Tech in Structural Engineering and earned a Ph.D. from IIT Delhi, where his research focused on rural housing and technology transfer in Bihar.\n\nDuring his thirty-one-year association with the Muzaffarpur Institute of Technology, Prof. Kumar held several important academic and administrative positions, including Principal of multiple engineering colleges across Bihar. He is a Chartered Engineer and Life Member of the Institution of Engineers (India), as well as a member of the Indian Society of Earthquake Technology and the Indian Building Congress. His academic contributions include numerous journal publications, conference papers, and consultancy assignments for government organisations."
  },
  {
    name: "A. M. Prasad",
    role: "Former IRS Officer | Former Special Secretary, Govt. of India",
    hash: "dir-06",
    image: "/directors/A.M-Prasad.jpg",
    category: "board",
    bio: "A. M. Prasad is a distinguished retired officer of the Indian Revenue Service (IRS) who has served in several senior leadership positions within the Government of India. During his distinguished public service career, he held offices including Member of the National Tribunal on Forfeited Properties, Special Secretary in the Ministry of Finance, Director General of the Central Bureau of Economic Intelligence, Member of the Central Board of Excise and Customs, and Chief Commissioner of Central Excise and Customs, Mumbai.\n\nHis professional responsibilities also included leadership in economic intelligence, customs administration, and narcotics enforcement, with several deputations to United Nations agencies on international assignments.\n\nFollowing his retirement, Mr. Prasad continued his commitment to public service through leadership roles in professional and social organisations. He served as President of the Patna Chapter of the National Human Resources Development Network and the Bihar Human Rights Association. He has also served as an Independent Director in the pharmaceutical sector while actively promoting education and community welfare by establishing a public library and supporting a free school for children from underprivileged families in Patna."
  },
];

export const MANAGEMENT_TEAM: DirectorProfile[] = [
  {
    name: "Shashank Shrivastava",
    role: "Manager, NBRF Think Tank",
    hash: "mgmt-01",
    image: "/directors/shashank-shrivastava.jpg",
    category: "management",
    bio: "Shashank Shrivastava is a UGC-NET qualified social work researcher and development professional with expertise in rural development, public policy, and impact assessment. As Manager at the Nav Bihar Renaissance Foundation (NBRF), he leads organisational management while overseeing research projects, publications, and policy initiatives. His work spans large-scale socio-economic research, livelihood development, women's empowerment, and evidence-based policy analysis. A published researcher with extensive field experience, Shashank is committed to advancing inclusive development through rigorous research, strategic programme management, and knowledge-driven public policy."
  }
];
