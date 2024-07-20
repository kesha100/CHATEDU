'use client'

import { Provider } from "react-redux"
import {makeStore} from "@/app/lib/store/store";

const store = makeStore();
export default function StoreProvider({
  children
}: {
    children: React.ReactNode
}) {

    return <Provider store={store}>{children}</Provider>
}