module Utils where

import System.Random

uncurry3 :: (a -> b -> c -> d) -> (a, b, c) -> d
uncurry3 f (a, b, c) = f a b c

randomColor :: IO (Float, Float, Float)
randomColor = do
    r <- randomRIO (100, 255)
    g <- randomRIO (0, 255)
    b <- randomRIO (200, 255)
    return (r, g, b)

randList = do
    seed <- randomIO :: IO Int
    return (randoms (mkStdGen seed) :: [Float])

randomPairs = do
    l1 <- randList
    zip l1 <$> randList
