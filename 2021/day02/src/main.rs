use std::io::BufRead;
use utils::read_input;

fn main() {
    let reader = read_input();
    let parsed_input = reader
        .lines()
        .map(|s| s.unwrap())
        .map(|line| {
            let v = line.split_whitespace().take(2).collect::<Vec<&str>>();
            let [instruction, value] = <[&str; 2]>::try_from(v).ok().unwrap();
            return (String::from(instruction), value.parse::<u32>().unwrap());
        })
        .collect::<Vec<(String, u32)>>();

    println!("Part one: {:?}", part_one(&parsed_input));
    println!("Part two: {:?}", part_two(&parsed_input));
}

fn part_one(vec: &Vec<(String, u32)>) -> u32 {
    let (x, depth) =
        vec.into_iter().fold(
            (0u32, 0u32),
            |(f, d), (instruction, value)| match instruction.as_str() {
                "forward" => (f + value, d),
                "down" => (f, d + value),
                "up" => (f, d - value),
                _ => unreachable!(),
            },
        );

    return x * depth;
}

fn part_two(vec: &Vec<(String, u32)>) -> u32 {
    let (x, depth, _) = vec.into_iter().fold(
        (0u32, 0u32, 0u32),
        |(f, d, a), (instruction, value)| match instruction.as_str() {
            "forward" => (f + value, d + a * value, a),
            "down" => (f, d, a + value),
            "up" => (f, d, a - value),
            _ => unreachable!(),
        },
    );

    return x * depth;
}
