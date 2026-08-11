import { PresentationControls } from '@react-three/drei'
import React, { useRef } from 'react'
import MacbookModel16 from '../models/Macbook-16'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import MacbookModel14 from '../models/Macbook-14';


const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5

const fadeMeshes = (group, opacity) => {
    if (!group) return

    group.traverse((child) => {
        if (child.isMesh) {
            child.material.transparent = true
            gsap.to(child.material, { opacity, duration: ANIMATION_DURATION })
        }
    })
}

const moveGroup = (group, x) => {
    if (!group) return

    gsap.to(group.position, { x, duration: ANIMATION_DURATION })
}

const ModelSwitcher = ({ scale, isMobile }) => {
    const SCALE_LARGE_DESKTOP = 0.08
    const SCALE_LARGE_MOBILE = 0.05

    const smallMacBookRef = useRef()
    const largeMacBookRef = useRef()

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE


    useGSAP(() => {

        if (showLargeMacbook) {
            moveGroup(smallMacBookRef.current, -OFFSET_DISTANCE)
            moveGroup(largeMacBookRef.current, 0)

            fadeMeshes(smallMacBookRef.current, 0)
            fadeMeshes(largeMacBookRef.current, 1)
        } else {
            moveGroup(smallMacBookRef.current, 0)
            moveGroup(largeMacBookRef.current, OFFSET_DISTANCE)

            fadeMeshes(smallMacBookRef.current, 1)
            fadeMeshes(largeMacBookRef.current, 0)

        }
    }, [scale])

    const controlConfigs = {
        snap: true,
        speed: 1,
        zoom: 1,
        // polar: [-Math.PI, Math.PI]
        azimuth: [-Infinity, Infinity],
        config: { mass: 1, tension: 0, friction: 0 }
    }

    return (
        <>
            <PresentationControls {...controlConfigs}>
                <group ref={largeMacBookRef}>
                    <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
                </group>
            </PresentationControls>
            <PresentationControls {...controlConfigs}>
                <group ref={smallMacBookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    )
}

export default ModelSwitcher