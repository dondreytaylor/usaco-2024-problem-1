import sys


def main() -> None:
    data = sys.stdin.buffer.read().split()
    if not data:
        return

    t = int(data[0])
    out_lines: list[str] = []

    # S can be extremely large, so we treat it as bytes and only inspect its last digit.
    for i in range(1, t + 1):
        s = data[i]
        out_lines.append("E" if s[-1] == ord("0") else "B")

    sys.stdout.write("\n".join(out_lines) + ("\n" if out_lines else ""))


if __name__ == "__main__":
    main()
