module Lib.Random where

import System.Random

randomColor :: IO (Float, Float, Float)
randomColor = do
    r <- randomRIO (100, 255)
    g <- randomRIO (0, 255)
    b <- randomRIO (200, 255)
    return (r, g, b)

randListIntR :: (Int, Int) -> Int -> IO [Int]
randListIntR (a, b) size = mapM (const (randomRIO (a, b))) [1..size]

randList = do
    seed <- randomIO :: IO Int
    return (randoms (mkStdGen seed) :: [Float])

randomPairs = do
    l1 <- randList
    zip l1 <$> randList

randomFloat = randomIO :: IO Float
