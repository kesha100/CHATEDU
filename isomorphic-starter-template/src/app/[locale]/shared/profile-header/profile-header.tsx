'use client';

import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useBerylliumSidebars} from "@/layouts/beryllium-utils";

interface userProps{
    name: string,
    email: string
}

export default function ProfileHeader({name, email}: userProps) {
    const { layout } = useLayout();
    const { expandedLeft } = useBerylliumSidebars();

    return (
        <div>
            <div
                className={cn(
                    '-mx-6 h-[150px] bg-gradient-to-r from-blue-500 to-white @5xl:h-[200px] 3xl:-mx-8 3xl:h-[250px] 4xl:-mx-10 4xl:h-[300px]',
                    layout === LAYOUT_OPTIONS.BERYLLIUM &&
                    (expandedLeft
                        ? 'xl:-me-8 3xl:-ms-5 4xl:-ms-4'
                        : 'xl:-me-8 4xl:-ms-6')
                )}
            />

            <div className="mx-auto w-full max-w-[1294px] @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between">
                <div className="flex h-auto gap-4 @5xl:gap-6">

                    <div className="pt-2.5">
                        <Title
                            as="h1"
                            className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
                        >
                            {name}
                        </Title>
                        <Text className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
                            {email}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
}
