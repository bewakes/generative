module Rectangles where

import Graphics.Proc
import Lib.Random
import Lib.Utils

subdivisions = 10
splitPercent = 0.8
splitRangeStart = (1 - splitPercent) / 2
minWidth = 15
minHeight = 15
colors =
    [
      rgb 38 71 124
    , rgb 240 217 92
    , rgb 162 45 40
    , rgb 223 224 236
    , rgb 223 224 236
     ]

type RectPoints = (P2, P2)

verticalSplit :: RectPoints -> IO [RectPoints]
verticalSplit r@(tl@(tlx, tly), br@(brx, bry))
  = if width < minHeight then return [r]
    else do
        rand <- randomFloat
        let m = tlx + splitRangeStart * width + rand * (splitPercent*width)
            tm = (m, tly)
            bm = (m, bry)
        return [(tl, bm), (tm, br)]
        where width = abs (tlx - brx)

horizontalSplit :: RectPoints -> IO [RectPoints]
horizontalSplit r@(tl@(tlx, tly), br@(brx, bry))
  = if height < minHeight then return [r]
    else do
        rand <- randomFloat
        let m = tly + splitRangeStart * height + rand * (splitPercent * height)
            lm = (tlx, m)
            rm = (brx, m)
        return [(tl, rm), (lm, br)]
        where height = abs (tly - bry)

subdivide :: [RectPoints] -> Int -> IO [RectPoints]
subdivide [] _ = return []
subdivide (x: xs) n
  | n <= 0 = return (x:xs)
  | otherwise = do
      rand <- randomFloat
      splitted <- if rand < 0.5 then verticalSplit x else horizontalSplit x
      (++) <$> subdivide splitted (n-1) <*> subdivide xs n

rectanglesSetup w h = do
    size (w, h)
    let rects :: [RectPoints]
        rects = [((0, 0), (w, h))]
    subdividedRects <- liftIO $ subdivide rects subdivisions
    rectColors <- liftIO $ map (colors !!) <$> randListIntR (0, length colors-1) (length subdividedRects)
    return (subdividedRects, rectColors)

drawRect :: (RectPoints, Col) -> Draw
drawRect (points, col) = do
    stroke black
    strokeWeight 3
    fill col
    uncurry rect points

drawRects (rects, colors) = local $ mapM_ drawRect (zip rects colors)
