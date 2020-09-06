module CircleShadow where

import System.Random

import Graphics.Proc
import Lib.Utils
import Lib.Random

circlesRad = 5
offset = (3, 3)
circlesCount = 3000

circles :: IO [(Float, Float)]
circles = do
    x <- mapM (const (randomRIO (0, 400))) [1..circlesCount]
    y <- mapM (const (randomRIO (0, 400))) [1..circlesCount]
    return $ zip x y

colors = mapM (const randomColor) [1..circlesCount]

drawCircleWithShadow rad c@(cx, cy) color = do
    noStroke
    fill (rgba 20 20 20 10)
    mapM_ (\x -> circle (rad - x*0.25) (cx+fst offset, cy+snd offset)) [1..20]
    stroke (rgb 30 30 30)
    fill color
    circle rad c

drawCircles (centers, colors) = local $
    mapM_ f (zip centers colors)
        where f = uncurry $ drawCircleWithShadow circlesRad

circlesSetup w h = do
    size (w, h)
    pairs <- liftIO circles
    cols <- liftIO colors
    return (pairs, map (uncurry3 rgb) cols)
