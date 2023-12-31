
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from '../screens/Home'
import ListaAlunos from '../screens/ListaAlunos/ListaAlunos'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Alunos'>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Alunos" component={ListaAlunos} />
        </Drawer.Navigator>

    )
}