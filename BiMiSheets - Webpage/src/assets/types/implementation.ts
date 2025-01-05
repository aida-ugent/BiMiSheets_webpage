export interface implementation {
    packages: packages[];
    description?: string;
}

interface packages {
    programming_language: string;
    related_packages?: string[];
}