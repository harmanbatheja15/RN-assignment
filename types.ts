interface PrimaryDetails {
	Place: string;
	Salary: string;
}

interface Creative {
	thumb_url: string;
}

export interface Job {
	id: string | number;
	company_name: string;
	title: string;
	location: string;
	salary: string;
	whatsapp_no: number | string;
	image: string;
	primary_details: PrimaryDetails;
	creatives: Creative[];
}

export interface CardProps {
	id: string | number;
	company_name: string;
	title: string;
	location: string;
	salary: string;
	phone: number | string;
	image: string;
}
