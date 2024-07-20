'use client';

import { Title, Text, Button } from 'rizzui';
import cn from '@/utils/class-names';
import PDFIcon from "@/components/icons/pdf-solif";

const mockdata = [
    {
        id: 2,
        file: {
            name: 'Employee history.pdf',
            image: PDFIcon,
        },
    }
];

export function QuickAccessCard({
                                    item,
                                    className,
                                }: {
    item: any;
    className?: string;
}) {
    return (
        <div
            className={cn(
                className,
                'relative flex flex-col items-center justify-center rounded-lg bg-gray-50 p-7 dark:bg-gray-100/50'
            )}
        >
            {item?.file?.image && (
                <div className="w-14">
                    <item.file.image/>
                </div>
            )}
            <Text className="mt-5 w-full truncate text-center text-sm font-medium text-gray-700">
                {item?.file?.name}
            </Text>
        </div>
    );
}

export default function ProfileFiles() {

    return (
        <div>
            <div className="col-span-full mb-3 flex items-center justify-between 2xl:mb-5">
                <Title as="h3" className="text-lg font-semibold xl:text-xl">
                    Quick Access
                </Title>
            </div>
            <div>

                <div
                    className="gap-5 flex flex-wrap"
                >
                    {mockdata.map((item) => (
    <a key={item.id} href="/file/ChatIvy.pdf" target="_blank" rel="noopener noreferrer">
        <QuickAccessCard item={item}/>
    </a>
))}
                </div>

            </div>
        </div>
    );
}
