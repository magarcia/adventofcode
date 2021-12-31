use std::io::BufRead;
use utils::read_input;

fn main() {
    let reader = read_input();
    let parsed_input = reader
        .lines()
        .map(|n| n.unwrap())
        .map(|n| n.parse().unwrap())
        .collect::<Vec<u16>>();

    println!("Part one: {:?}", part_one(&parsed_input));
    println!("Part two: {:?}", part_two(&parsed_input));
}

fn part_one(input: &Vec<u16>) -> u16 {
    let mut count = 0;
    let mut prev = input[0];
    for i in 1..input.len() {
        if prev < input[i] {
            count += 1;
        }
        prev = input[i];
    }

    count
}

fn part_two(input: &Vec<u16>) -> u16 {
    let mut count = 0;
    let mut prev: u16 = input[0..3].iter().sum();
    for i in 0..(input.len() - 3) {
        let curr = prev - input[i] + input[i + 3];
        if prev < curr {
            count += 1;
        }
        prev = curr;
    }

    count
}
