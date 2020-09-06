module Main where

import System.Random

import Graphics.Proc

import CircleShadow
import Rectangles

width  = 400
height = 400
center = (width / 2, height / 2)


setup = rectanglesSetup width height

draw' xs = do
    background white
    drawRects xs

update = return


main = runProc $ def
    { procSetup  = setup
    , procDraw   = draw'
    , procUpdate = update }
