use std::io::BufRead;
use utils::read_input;

fn main() {
    let reader = read_input();
    let input_as_str: Vec<String> = reader.lines().map(|s| s.unwrap()).collect();
    let width = input_as_str[0].len() as u32;
    let total = input_as_str.len() as u32;

    let input_as_int = input_as_str
        .into_iter()
        .map(|s| u32::from_str_radix(s.as_str(), 2).unwrap())
        .collect::<Vec<u32>>();

    println!("Part one: {:?}", part_one(&input_as_int, width, total));
    // println!("Part two: {:?}", part_two(&parsed_input));
}

fn part_one(input: &Vec<u32>, width: u32, total: u32) -> u32 {
    let gamma = input
        .into_iter()
        .fold(vec![0u32; width as usize], |count, bits| {
            count
                .into_iter()
                .enumerate()
                .map(|(i, bit_count)| bit_count + ((bits & 1 << i) >> i))
                .collect()
        })
        .into_iter()
        .enumerate()
        .map(|(i, b)| ((b >= total / 2) as u32) << i)
        .sum::<u32>();

    return gamma * (!gamma & ((1 << width) - 1));
}
