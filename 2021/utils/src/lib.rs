use std::env;
use std::fs;
use std::io::{self, BufRead, BufReader};

pub fn read_input() -> Box<dyn BufRead> {
    let input = env::args().nth(1);
    return match input {
        None => Box::new(BufReader::new(io::stdin())),
        Some(filename) => Box::new(BufReader::new(fs::File::open(filename).unwrap())),
    };
}
