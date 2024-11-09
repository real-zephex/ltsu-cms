export interface Courses {
  course_id: number;
  course_name: string;
  duration: number;
}

export interface Classes {
  class_id: number;
  class_name: string;
  year: number;
  course_id: number;
  total: number;
}

export interface Students {
  student_id: number;
  name: string;
  email: string;
  phone: number;
  dob: string;
  address: string;
  enrollment_date: string;
  class_id: number;
}

export interface OverviewData {
  status: boolean;
  data: Classes[] | Students[] | null;
}

export interface Teachers {
  teacher_id: number;
  created_at: string;
  name: string;
  subject: string;
  email: string;
  phone: number;
}

export interface TeacherMetadata {
  name: string;
  role: string;
  phone: string;
}

export interface AttendanceInfo {
  attendance_id: string;
  created_at?: string;
  class_id: string;
  teacher_id: string;
  subject: string;
  attendance_data: AttendanceData[];
  period: number;
}

export interface AttendanceData {
  name: string;
  student_id: number;
  status: boolean;
}

export interface AttendanceStatus {
  success: boolean;
  message: string;
}
